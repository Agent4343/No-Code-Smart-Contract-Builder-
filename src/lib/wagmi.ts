import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, arbitrum, optimism, base, sepolia, polygonMumbai } from 'wagmi/chains';

// Get WalletConnect Project ID from environment
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id';

// Configure chains and providers
export const config = getDefaultConfig({
  appName: 'ContractForge',
  projectId, // Get from https://cloud.walletconnect.com
  chains: [
    mainnet,
    polygon,
    arbitrum,
    optimism,
    base,
    // Testnets
    sepolia,
    polygonMumbai,
  ],
  ssr: false,
});

// Export chains for use elsewhere
export const supportedChains = [
  { id: 1, name: 'Ethereum', testnet: false },
  { id: 137, name: 'Polygon', testnet: false },
  { id: 42161, name: 'Arbitrum', testnet: false },
  { id: 10, name: 'Optimism', testnet: false },
  { id: 8453, name: 'Base', testnet: false },
  { id: 11155111, name: 'Sepolia', testnet: true },
  { id: 80001, name: 'Mumbai', testnet: true },
];
