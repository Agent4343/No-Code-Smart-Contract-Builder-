# ContractForge - No-Code Smart Contract Builder

A web-based no-code smart contract builder that allows users to create, test, and deploy blockchain contracts through a drag-and-drop interface. Build secure, audited smart contracts without writing a single line of code.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Solidity](https://img.shields.io/badge/solidity-%5E0.8.20-363636.svg)

## Features

### Visual Contract Builder
- **Drag-and-Drop Interface**: Assemble logic blocks (conditions, actions, events) without writing code
- **Real-time Preview**: See your generated Solidity code as you build
- **Interactive Canvas**: Connect blocks visually using React Flow

### Template Library
Pre-built, audited templates for common smart contracts:
- **ERC-20 Tokens**: Fungible tokens with minting, burning, and pause capabilities
- **ERC-721 NFTs**: NFT collections with royalties and whitelist minting
- **ERC-1155 Multi-Token**: Combined fungible and non-fungible token support
- **DeFi Protocols**: Staking pools, vesting contracts, and escrow services
- **Governance**: DAO voting systems with timelock execution

### Multi-Chain Deployment
One-click deployment across multiple networks:
- Ethereum Mainnet & Sepolia
- Polygon & Amoy Testnet
- BNB Chain & Testnet
- Arbitrum One & Sepolia
- Optimism
- Avalanche
- Base

### Security & Gas Optimization
- **Real-time Security Scanning**: Automated vulnerability detection
- **Gas Cost Estimation**: See estimated deployment and function costs
- **OpenZeppelin Integration**: Built on battle-tested, audited contracts

### Additional Features
- **Wallet Integration**: Connect with MetaMask and WalletConnect
- **Testnet Sandbox**: Test contracts before mainnet deployment
- **Analytics Dashboard**: Monitor contract performance and usage
- **Template Marketplace**: Discover and share community templates
- **Interactive Tutorial**: Step-by-step "How It Works" guide for new users
- **Real-time Compilation**: Instant Solidity compilation with error feedback
- **Contract Verification**: Automatic source verification on block explorers

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/no-code-smart-contract-builder.git

# Navigate to project directory
cd no-code-smart-contract-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── builder/           # Contract builder components
│   │   ├── BlockPalette.tsx
│   │   ├── CodePreview.tsx
│   │   ├── ContractBlockNode.tsx
│   │   └── PropertiesPanel.tsx
│   ├── Header.tsx
│   ├── Layout.tsx
│   └── Sidebar.tsx
├── lib/
│   └── codeGenerator.ts   # Solidity code generation engine
├── pages/
│   ├── Analytics.tsx
│   ├── ContractBuilder.tsx
│   ├── Dashboard.tsx
│   ├── Deployments.tsx
│   ├── HowItWorks.tsx     # Interactive tutorial & guide
│   ├── Marketplace.tsx
│   ├── Settings.tsx
│   └── Templates.tsx
├── store/
│   ├── contractStore.ts   # Zustand state management
│   ├── templateStore.ts
│   └── walletStore.ts
├── types/
│   ├── blocks.ts          # Block definitions
│   ├── index.ts           # Type definitions
│   └── networks.ts        # Network configurations
├── App.tsx
├── index.css
└── main.tsx

backend/
├── src/
│   ├── routes/            # API route handlers
│   ├── services/          # Business logic
│   ├── middleware/        # Auth, validation, rate limiting
│   └── index.ts           # Server entry point
├── prisma/
│   └── schema.prisma      # Database schema
└── package.json
```

## Available Blocks

### Token Blocks
| Block | Description |
|-------|-------------|
| ERC-20 Token | Standard fungible token |
| Mintable Token | Add minting capability |
| Burnable Token | Allow token burning |
| Pausable Token | Emergency pause mechanism |
| ERC-721 NFT | Non-fungible token collection |
| NFT Royalties | EIP-2981 royalty support |
| ERC-1155 Multi-Token | Combined token standard |

### Access Control Blocks
| Block | Description |
|-------|-------------|
| Ownable | Single owner access control |
| Role-Based Access | Multiple role permissions |
| Multi-Signature | Require multiple signatures |

### DeFi Blocks
| Block | Description |
|-------|-------------|
| Staking Pool | Stake tokens for rewards |
| Token Vesting | Time-locked token release |
| Escrow | Hold funds until conditions met |

### Governance Blocks
| Block | Description |
|-------|-------------|
| Voting System | On-chain proposal voting |
| Timelock | Delayed execution |

### Utility Blocks
| Block | Description |
|-------|-------------|
| Reentrancy Guard | Prevent reentrancy attacks |
| Withdraw Function | Owner withdrawal |
| Whitelist | Address restrictions |

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Visual Builder**: React Flow
- **Drag & Drop**: @dnd-kit
- **Wallet Integration**: wagmi, viem
- **Notifications**: react-hot-toast

## Security Considerations

- All generated contracts use OpenZeppelin's audited libraries
- Built-in security scanning for common vulnerabilities
- Reentrancy protection included by default
- Solidity 0.8.20+ with overflow protection
- SPDX license identifiers included

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [OpenZeppelin](https://openzeppelin.com/) for secure smart contract libraries
- [React Flow](https://reactflow.dev/) for the visual builder canvas
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [wagmi](https://wagmi.sh/) for wallet integration

## Documentation

- **[README.md](README.md)** - This file, project overview and getting started
- **[DEPLOY.md](DEPLOY.md)** - Complete deployment guide for production
- **[BUSINESS_PLAN.txt](BUSINESS_PLAN.txt)** - Business model and monetization strategies
- **[backend/README.md](backend/README.md)** - Backend API documentation
- **How It Works** - In-app interactive tutorial (accessible from sidebar)

## Roadmap

### Completed
- [x] Visual drag-and-drop contract builder
- [x] Multi-chain deployment support
- [x] Wallet integration (MetaMask, WalletConnect)
- [x] Backend API with authentication
- [x] Stripe payment processing
- [x] Security scanning
- [x] Template marketplace

### In Progress
- [ ] Solana/Rust contract support
- [ ] AI-powered contract optimization
- [ ] Formal verification integration
- [ ] Custom block creation
- [ ] Contract upgrade patterns (UUPS, Transparent Proxy)
- [ ] Multi-language support
- [ ] Mobile app
