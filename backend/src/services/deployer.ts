import { ethers } from 'ethers';

interface NetworkConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  explorerApiUrl?: string;
  explorerApiKey?: string;
}

const NETWORKS: Record<string, NetworkConfig> = {
  ethereum: {
    chainId: 1,
    name: 'Ethereum',
    rpcUrl: process.env.ETHEREUM_RPC_URL || '',
    explorerUrl: 'https://etherscan.io',
    explorerApiUrl: 'https://api.etherscan.io/api',
    explorerApiKey: process.env.ETHERSCAN_API_KEY,
  },
  sepolia: {
    chainId: 11155111,
    name: 'Sepolia',
    rpcUrl: process.env.SEPOLIA_RPC_URL || '',
    explorerUrl: 'https://sepolia.etherscan.io',
    explorerApiUrl: 'https://api-sepolia.etherscan.io/api',
    explorerApiKey: process.env.ETHERSCAN_API_KEY,
  },
  polygon: {
    chainId: 137,
    name: 'Polygon',
    rpcUrl: process.env.POLYGON_RPC_URL || '',
    explorerUrl: 'https://polygonscan.com',
    explorerApiUrl: 'https://api.polygonscan.com/api',
    explorerApiKey: process.env.POLYGONSCAN_API_KEY,
  },
  'polygon-amoy': {
    chainId: 80002,
    name: 'Polygon Amoy',
    rpcUrl: process.env.POLYGON_AMOY_RPC_URL || '',
    explorerUrl: 'https://www.oklink.com/amoy',
  },
  bsc: {
    chainId: 56,
    name: 'BNB Chain',
    rpcUrl: process.env.BSC_RPC_URL || 'https://bsc-dataseed.binance.org/',
    explorerUrl: 'https://bscscan.com',
    explorerApiUrl: 'https://api.bscscan.com/api',
    explorerApiKey: process.env.BSCSCAN_API_KEY,
  },
  arbitrum: {
    chainId: 42161,
    name: 'Arbitrum One',
    rpcUrl: process.env.ARBITRUM_RPC_URL || 'https://arb1.arbitrum.io/rpc',
    explorerUrl: 'https://arbiscan.io',
  },
  base: {
    chainId: 8453,
    name: 'Base',
    rpcUrl: process.env.BASE_RPC_URL || 'https://mainnet.base.org',
    explorerUrl: 'https://basescan.org',
  },
};

export function getNetworkConfig(networkId: string): NetworkConfig | undefined {
  return NETWORKS[networkId];
}

export function getAllNetworks(): NetworkConfig[] {
  return Object.values(NETWORKS);
}

interface DeployParams {
  networkId: string;
  bytecode: string;
  abi: object[];
  constructorArgs?: unknown[];
  privateKey: string; // User's private key (handled securely)
}

interface DeployResult {
  success: boolean;
  contractAddress?: string;
  transactionHash?: string;
  gasUsed?: number;
  error?: string;
}

export async function deployContract(params: DeployParams): Promise<DeployResult> {
  const { networkId, bytecode, abi, constructorArgs = [], privateKey } = params;

  const network = getNetworkConfig(networkId);
  if (!network) {
    return { success: false, error: `Unknown network: ${networkId}` };
  }

  if (!network.rpcUrl) {
    return { success: false, error: `RPC URL not configured for ${networkId}` };
  }

  try {
    const provider = new ethers.JsonRpcProvider(network.rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    const factory = new ethers.ContractFactory(abi, bytecode, wallet);

    console.log(`Deploying to ${network.name}...`);

    const contract = await factory.deploy(...constructorArgs);
    const receipt = await contract.deploymentTransaction()?.wait();

    if (!receipt) {
      return { success: false, error: 'Deployment transaction failed' };
    }

    return {
      success: true,
      contractAddress: await contract.getAddress(),
      transactionHash: receipt.hash,
      gasUsed: Number(receipt.gasUsed),
    };
  } catch (error) {
    console.error('Deployment error:', error);
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}

interface EstimateGasParams {
  networkId: string;
  bytecode: string;
  abi: object[];
  constructorArgs?: unknown[];
}

export async function estimateDeploymentGas(
  params: EstimateGasParams
): Promise<{ gasEstimate: bigint; gasCostWei: bigint; gasCostEth: string } | { error: string }> {
  const { networkId, bytecode, abi, constructorArgs = [] } = params;

  const network = getNetworkConfig(networkId);
  if (!network || !network.rpcUrl) {
    return { error: `Network ${networkId} not configured` };
  }

  try {
    const provider = new ethers.JsonRpcProvider(network.rpcUrl);
    const factory = new ethers.ContractFactory(abi, bytecode);

    const deployTx = await factory.getDeployTransaction(...constructorArgs);
    const gasEstimate = await provider.estimateGas(deployTx);
    const feeData = await provider.getFeeData();

    const gasPrice = feeData.gasPrice || BigInt(30000000000); // 30 gwei fallback
    const gasCostWei = gasEstimate * gasPrice;
    const gasCostEth = ethers.formatEther(gasCostWei);

    return { gasEstimate, gasCostWei, gasCostEth };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function verifyContract(
  networkId: string,
  contractAddress: string,
  sourceCode: string,
  contractName: string,
  constructorArgs: string = ''
): Promise<{ success: boolean; guid?: string; error?: string }> {
  const network = getNetworkConfig(networkId);

  if (!network?.explorerApiUrl || !network?.explorerApiKey) {
    return { success: false, error: 'Verification not supported for this network' };
  }

  try {
    const params = new URLSearchParams({
      apikey: network.explorerApiKey,
      module: 'contract',
      action: 'verifysourcecode',
      contractaddress: contractAddress,
      sourceCode,
      codeformat: 'solidity-single-file',
      contractname: contractName,
      compilerversion: 'v0.8.20+commit.a1b79de6',
      optimizationUsed: '1',
      runs: '200',
      constructorArguements: constructorArgs,
    });

    const response = await fetch(network.explorerApiUrl, {
      method: 'POST',
      body: params,
    });

    const result = await response.json();

    if (result.status === '1') {
      return { success: true, guid: result.result };
    } else {
      return { success: false, error: result.result };
    }
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
