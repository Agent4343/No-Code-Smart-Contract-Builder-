// Blockchain Network Types
export interface Network {
  id: string;
  name: string;
  chainId: number;
  rpcUrl: string;
  explorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  isTestnet: boolean;
  icon: string;
  color: string;
}

// Contract Block Types
export type BlockCategory =
  | 'token'
  | 'access'
  | 'governance'
  | 'defi'
  | 'utility'
  | 'storage'
  | 'event'
  | 'modifier';

export interface BlockParameter {
  name: string;
  type: 'string' | 'number' | 'address' | 'boolean' | 'uint256' | 'bytes32' | 'array';
  label: string;
  description: string;
  defaultValue?: string | number | boolean;
  required: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface ContractBlock {
  id: string;
  type: string;
  category: BlockCategory;
  name: string;
  description: string;
  icon: string;
  parameters: BlockParameter[];
  codeTemplate: string;
  dependencies?: string[];
  gasEstimate?: number;
  securityLevel: 'safe' | 'caution' | 'dangerous';
}

export interface PlacedBlock extends ContractBlock {
  instanceId: string;
  position: { x: number; y: number };
  parameterValues: Record<string, string | number | boolean>;
  connections: {
    inputs: string[];
    outputs: string[];
  };
}

// Contract Template Types
export interface ContractTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  blocks: PlacedBlock[];
  metadata: {
    author: string;
    version: string;
    license: string;
    audited: boolean;
    tags: string[];
  };
  estimatedGas: number;
  popularity: number;
  rating: number;
}

// Generated Contract Types
export interface GeneratedContract {
  id: string;
  name: string;
  sourceCode: string;
  abi: object[];
  bytecode: string;
  constructorArgs: unknown[];
  compiler: {
    version: string;
    optimizer: {
      enabled: boolean;
      runs: number;
    };
  };
  securityReport: SecurityReport;
  gasEstimates: GasEstimates;
}

export interface SecurityReport {
  score: number;
  issues: SecurityIssue[];
  recommendations: string[];
  passedChecks: string[];
}

export interface SecurityIssue {
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  location?: string;
  recommendation: string;
}

export interface GasEstimates {
  deployment: number;
  functions: Record<string, number>;
  totalEstimate: number;
  costInUSD: number;
}

// Deployment Types
export interface Deployment {
  id: string;
  contractId: string;
  contractName: string;
  network: Network;
  address: string;
  transactionHash: string;
  deployedAt: Date;
  deployer: string;
  status: 'pending' | 'confirmed' | 'failed';
  verified: boolean;
  gasUsed: number;
  gasCost: string;
}

// User Types
export interface User {
  address: string;
  ensName?: string;
  avatar?: string;
  contracts: string[];
  deployments: string[];
  subscription: SubscriptionTier;
}

export type SubscriptionTier = 'free' | 'starter' | 'professional' | 'enterprise';

// Marketplace Types
export interface MarketplaceItem {
  id: string;
  type: 'template' | 'block' | 'integration';
  name: string;
  description: string;
  author: {
    address: string;
    name: string;
    verified: boolean;
  };
  price: number;
  currency: 'USD' | 'ETH';
  downloads: number;
  rating: number;
  reviews: number;
  tags: string[];
  preview: string;
  createdAt: Date;
  updatedAt: Date;
}

// Analytics Types
export interface ContractAnalytics {
  contractId: string;
  deploymentId: string;
  metrics: {
    transactions: number;
    uniqueUsers: number;
    gasSpent: string;
    volume: string;
  };
  timeSeriesData: {
    date: string;
    transactions: number;
    volume: string;
  }[];
}

// Event Types for the Builder
export interface BuilderEvent {
  type: 'block_added' | 'block_removed' | 'block_moved' | 'connection_created' | 'connection_removed' | 'parameter_changed';
  blockId?: string;
  data?: unknown;
  timestamp: Date;
}

// Node Types for React Flow
export interface ContractNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: PlacedBlock;
}

export interface ContractEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  type?: string;
}
