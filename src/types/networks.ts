import { Network } from './index';

export const NETWORKS: Network[] = [
  // Mainnets
  {
    id: 'ethereum',
    name: 'Ethereum',
    chainId: 1,
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/',
    explorerUrl: 'https://etherscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    isTestnet: false,
    icon: '⟠',
    color: '#627EEA',
  },
  {
    id: 'polygon',
    name: 'Polygon',
    chainId: 137,
    rpcUrl: 'https://polygon-mainnet.g.alchemy.com/v2/',
    explorerUrl: 'https://polygonscan.com',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    isTestnet: false,
    icon: '⬡',
    color: '#8247E5',
  },
  {
    id: 'bsc',
    name: 'BNB Chain',
    chainId: 56,
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    explorerUrl: 'https://bscscan.com',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    isTestnet: false,
    icon: '◈',
    color: '#F0B90B',
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    chainId: 43114,
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    explorerUrl: 'https://snowtrace.io',
    nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
    isTestnet: false,
    icon: '▲',
    color: '#E84142',
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum One',
    chainId: 42161,
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    explorerUrl: 'https://arbiscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    isTestnet: false,
    icon: '🔵',
    color: '#28A0F0',
  },
  {
    id: 'optimism',
    name: 'Optimism',
    chainId: 10,
    rpcUrl: 'https://mainnet.optimism.io',
    explorerUrl: 'https://optimistic.etherscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    isTestnet: false,
    icon: '🔴',
    color: '#FF0420',
  },
  {
    id: 'base',
    name: 'Base',
    chainId: 8453,
    rpcUrl: 'https://mainnet.base.org',
    explorerUrl: 'https://basescan.org',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    isTestnet: false,
    icon: '🔷',
    color: '#0052FF',
  },
  // Testnets
  {
    id: 'sepolia',
    name: 'Sepolia',
    chainId: 11155111,
    rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/',
    explorerUrl: 'https://sepolia.etherscan.io',
    nativeCurrency: { name: 'SepoliaETH', symbol: 'ETH', decimals: 18 },
    isTestnet: true,
    icon: '⟠',
    color: '#627EEA',
  },
  {
    id: 'polygon-amoy',
    name: 'Polygon Amoy',
    chainId: 80002,
    rpcUrl: 'https://rpc-amoy.polygon.technology/',
    explorerUrl: 'https://www.oklink.com/amoy',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    isTestnet: true,
    icon: '⬡',
    color: '#8247E5',
  },
  {
    id: 'bsc-testnet',
    name: 'BSC Testnet',
    chainId: 97,
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    explorerUrl: 'https://testnet.bscscan.com',
    nativeCurrency: { name: 'tBNB', symbol: 'tBNB', decimals: 18 },
    isTestnet: true,
    icon: '◈',
    color: '#F0B90B',
  },
  {
    id: 'arbitrum-sepolia',
    name: 'Arbitrum Sepolia',
    chainId: 421614,
    rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
    explorerUrl: 'https://sepolia.arbiscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    isTestnet: true,
    icon: '🔵',
    color: '#28A0F0',
  },
  {
    id: 'base-sepolia',
    name: 'Base Sepolia',
    chainId: 84532,
    rpcUrl: 'https://sepolia.base.org',
    explorerUrl: 'https://sepolia.basescan.org',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    isTestnet: true,
    icon: '🔷',
    color: '#0052FF',
  },
];

export const getNetworkById = (id: string): Network | undefined => {
  return NETWORKS.find((n) => n.id === id);
};

export const getNetworkByChainId = (chainId: number): Network | undefined => {
  return NETWORKS.find((n) => n.chainId === chainId);
};

export const getMainnets = (): Network[] => {
  return NETWORKS.filter((n) => !n.isTestnet);
};

export const getTestnets = (): Network[] => {
  return NETWORKS.filter((n) => n.isTestnet);
};
