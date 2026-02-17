import { Link } from 'react-router-dom';
import {
  Puzzle,
  Settings,
  Code,
  Rocket,
  Shield,
  Zap,
  ArrowRight,
  ArrowDown,
  CheckCircle,
  Globe,
  Lock,
  Blocks,
} from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Puzzle,
    title: 'Drag & Drop Blocks',
    description:
      'Browse our library of 30+ pre-built, audited smart contract blocks. Simply click or drag them onto the visual canvas to compose your contract.',
    details: [
      'ERC-20 tokens, NFTs, DeFi protocols',
      'Access control and governance',
      'Security utilities and modifiers',
    ],
    color: 'from-blue-500 to-blue-600',
  },
  {
    number: '02',
    icon: Settings,
    title: 'Configure Parameters',
    description:
      'Customize every block by setting parameters like token name, supply, royalty rates, and more. See changes reflected in real-time.',
    details: [
      'Set token name, symbol & supply',
      'Configure permissions and roles',
      'Adjust gas optimization settings',
    ],
    color: 'from-purple-500 to-purple-600',
  },
  {
    number: '03',
    icon: Code,
    title: 'Generate & Review',
    description:
      'ContractForge generates production-ready Solidity code. Review the source, ABI, and bytecode. Run a security scan to catch vulnerabilities.',
    details: [
      'OpenZeppelin-based audited code',
      'Full ABI and bytecode output',
      'Automated security scanning',
    ],
    color: 'from-green-500 to-green-600',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Deploy Anywhere',
    description:
      'Connect your wallet and deploy to 10+ blockchain networks with one click. Track your deployments and verify contracts on block explorers.',
    details: [
      'Ethereum, Polygon, Arbitrum, Base, ...',
      'Test on testnets first for free',
      'Auto-verify on Etherscan',
    ],
    color: 'from-orange-500 to-orange-600',
  },
];

const features = [
  {
    icon: Shield,
    title: 'Battle-Tested Security',
    description: 'All generated contracts use OpenZeppelin libraries - the most trusted name in smart contract security.',
  },
  {
    icon: Globe,
    title: 'Multi-Chain Support',
    description: 'Deploy to Ethereum, Polygon, Arbitrum, Base, BNB Chain, Avalanche, Optimism, and their testnets.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Go from idea to deployed contract in minutes, not weeks. Our visual builder generates optimized Solidity.',
  },
  {
    icon: Lock,
    title: 'Non-Custodial',
    description: 'Your wallet signs every transaction. We never hold your private keys or funds. You own your contracts.',
  },
];

export default function HowItWorks() {
  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-in">
      {/* Hero */}
      <div className="text-center py-8">
        <span className="badge-primary inline-flex mb-4">
          <Blocks className="w-3 h-3" />
          Visual Contract Builder
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          How <span className="gradient-text">ContractForge</span> Works
        </h1>
        <p className="text-xl text-slate-400 mt-4 max-w-2xl mx-auto leading-relaxed">
          Build, configure, and deploy smart contracts without writing a single line of Solidity. Our four-step process makes it simple.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.number}>
            <div className="card hover:border-slate-600/80 transition-colors">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                  >
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-mono text-primary-400 font-bold">
                      Step {step.number}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                  <p className="text-slate-400 mt-2 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="mt-4 space-y-2">
                    {step.details.map((detail) => (
                      <div
                        key={detail}
                        className="flex items-center gap-2 text-sm text-slate-300"
                      >
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className="flex justify-center py-2">
                <ArrowDown className="w-5 h-5 text-slate-600" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Features */}
      <div>
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          Why Builders Choose ContractForge
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-in">
          {features.map((feature) => (
            <div key={feature.title} className="card">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0 ring-1 ring-primary-500/20">
                  <feature.icon className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What Can You Build */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          What Can You Build?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-in">
          {[
            { label: 'ERC-20 Tokens', desc: 'Fungible tokens' },
            { label: 'NFT Collections', desc: 'ERC-721 & 1155' },
            { label: 'Staking Pools', desc: 'Yield farming' },
            { label: 'DAO Governance', desc: 'Voting systems' },
            { label: 'Token Vesting', desc: 'Locked releases' },
            { label: 'Escrow Services', desc: 'Conditional pay' },
            { label: 'Whitelist Mints', desc: 'Access control' },
            { label: 'Multi-Sig Wallets', desc: 'Shared control' },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 bg-slate-700/20 rounded-xl text-center hover:bg-slate-700/40 transition-colors"
            >
              <p className="font-medium text-white">{item.label}</p>
              <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-8 card bg-gradient-to-br from-primary-900/30 to-purple-900/30 border-primary-500/20">
        <h2 className="text-3xl font-bold text-white">
          Ready to Build Your First Contract?
        </h2>
        <p className="text-slate-400 mt-3 text-lg">
          Start for free. No credit card required.
        </p>
        <div className="flex items-center justify-center gap-4 mt-6">
          <Link to="/builder" className="btn-primary px-8 py-3 text-lg">
            <Zap className="w-5 h-5" />
            Launch Builder
          </Link>
          <Link to="/templates" className="btn-secondary px-8 py-3 text-lg">
            Browse Templates
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
