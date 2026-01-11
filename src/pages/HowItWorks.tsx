import { Link } from 'react-router-dom';
import {
  Wallet,
  MousePointer2,
  Settings,
  Code,
  Shield,
  Rocket,
  CheckCircle,
  ArrowRight,
  Coins,
  Image,
  TrendingUp,
  Users,
  Store,
  Briefcase,
  DollarSign,
  Zap,
  BookOpen,
  Play,
  Target,
  Gift,
  Building,
  Repeat,
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: Wallet,
      title: 'Connect Your Wallet',
      description: 'Link your MetaMask or any Web3 wallet to get started. This is your account and how you\'ll deploy contracts.',
      details: [
        'Click "Connect Wallet" button',
        'Approve the connection in MetaMask',
        'Your wallet address becomes your account',
      ],
      color: 'from-blue-500 to-blue-600',
    },
    {
      number: 2,
      icon: MousePointer2,
      title: 'Drag & Drop Blocks',
      description: 'Choose from pre-built blocks like tokens, NFTs, staking, and more. Simply drag them onto the canvas.',
      details: [
        'Browse the block library on the left',
        'Drag blocks to the canvas',
        'Connect blocks together',
      ],
      color: 'from-purple-500 to-purple-600',
    },
    {
      number: 3,
      icon: Settings,
      title: 'Configure Your Contract',
      description: 'Customize each block with your settings - token name, supply, features, and more.',
      details: [
        'Click any block to edit',
        'Fill in the parameters',
        'See live preview of changes',
      ],
      color: 'from-orange-500 to-orange-600',
    },
    {
      number: 4,
      icon: Code,
      title: 'Generate Code',
      description: 'Click generate and we\'ll write production-ready Solidity code using battle-tested OpenZeppelin contracts.',
      details: [
        'Click "Generate Contract"',
        'Review the source code',
        'Download or copy if needed',
      ],
      color: 'from-green-500 to-green-600',
    },
    {
      number: 5,
      icon: Shield,
      title: 'Security Scan',
      description: 'Automatic security analysis checks for vulnerabilities and gives you a safety score.',
      details: [
        'View security score (0-100)',
        'Check for warnings',
        'Get fix recommendations',
      ],
      color: 'from-red-500 to-red-600',
    },
    {
      number: 6,
      icon: Rocket,
      title: 'Deploy to Blockchain',
      description: 'Choose your network, pay gas fees, and deploy. Your contract goes live in minutes!',
      details: [
        'Select network (testnet or mainnet)',
        'Confirm in wallet',
        'Get your contract address',
      ],
      color: 'from-cyan-500 to-cyan-600',
    },
  ];

  const whatYouCanBuild = [
    {
      icon: Coins,
      title: 'Cryptocurrency Tokens',
      description: 'Create ERC-20 tokens for payments, rewards, governance, or utility in your ecosystem.',
      examples: ['Loyalty points', 'Game currency', 'DAO tokens', 'Payment tokens'],
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
    {
      icon: Image,
      title: 'NFT Collections',
      description: 'Launch NFT projects with minting, royalties, and marketplace integration.',
      examples: ['Art collections', 'Music NFTs', 'Membership passes', 'Digital tickets'],
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: TrendingUp,
      title: 'Staking & DeFi',
      description: 'Build staking pools where users earn rewards for locking tokens.',
      examples: ['Yield farming', 'Liquidity mining', 'Token staking', 'Reward pools'],
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: Users,
      title: 'DAOs & Governance',
      description: 'Create decentralized organizations with voting and proposal systems.',
      examples: ['Community DAOs', 'Investment clubs', 'Governance tokens', 'Voting systems'],
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
  ];

  const moneyMakingStrategies = [
    {
      icon: Coins,
      title: 'Launch Your Own Token',
      description: 'Create a cryptocurrency for your project or community. Sell tokens during launch, or use them for payments in your ecosystem.',
      howTo: [
        'Create an ERC-20 token',
        'Set initial supply and tokenomics',
        'Sell tokens via presale or DEX listing',
        'Build utility to increase demand',
      ],
      potential: '$1,000 - $1,000,000+',
      difficulty: 'Medium',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Image,
      title: 'Sell NFT Collections',
      description: 'Launch NFT art, collectibles, or utility NFTs. Earn from initial sales and ongoing royalties.',
      howTo: [
        'Create NFT contract with royalties',
        'Upload artwork to IPFS',
        'Set mint price and max supply',
        'Promote on social media',
      ],
      potential: '$500 - $500,000+',
      difficulty: 'Medium',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Store,
      title: 'Sell Templates in Marketplace',
      description: 'Create useful contract templates and sell them to other users on our marketplace.',
      howTo: [
        'Build a useful contract template',
        'Test thoroughly on testnet',
        'Submit to marketplace',
        'Earn per download/use',
      ],
      potential: '$100 - $10,000/month',
      difficulty: 'Easy',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Briefcase,
      title: 'Offer Contract Services',
      description: 'Build contracts for clients who need custom blockchain solutions. Use our platform to deliver fast.',
      howTo: [
        'Advertise your services (Fiverr, Upwork)',
        'Use ContractForge to build quickly',
        'Charge $500-5,000 per contract',
        'Deliver in days, not weeks',
      ],
      potential: '$2,000 - $20,000/month',
      difficulty: 'Medium',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: TrendingUp,
      title: 'Create Staking Platforms',
      description: 'Build staking pools and charge fees on rewards. Users stake, you earn a percentage.',
      howTo: [
        'Create staking contract with fee',
        'Set 1-5% reward fee',
        'Attract stakers with high APY',
        'Earn passive income from fees',
      ],
      potential: '$500 - $50,000/month',
      difficulty: 'Hard',
      color: 'from-teal-500 to-green-500',
    },
    {
      icon: Building,
      title: 'White-Label for Agencies',
      description: 'Partner with marketing agencies to provide blockchain services to their clients.',
      howTo: [
        'Contact marketing/web agencies',
        'Offer blockchain add-on services',
        'Build contracts for their clients',
        'Split revenue or charge flat fee',
      ],
      potential: '$5,000 - $50,000/month',
      difficulty: 'Medium',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  const useCases = [
    {
      icon: Gift,
      title: 'Loyalty Programs',
      description: 'Businesses create tokens customers earn and redeem for rewards.',
      example: 'Coffee shop creates 1000 COFFEE tokens. Customers earn 1 token per purchase, redeem 10 for a free drink.',
    },
    {
      icon: Users,
      title: 'Community Membership',
      description: 'NFTs that grant access to exclusive communities, content, or events.',
      example: 'Fitness influencer sells 500 NFT memberships at $50 each, granting access to private Discord and workout plans.',
    },
    {
      icon: Repeat,
      title: 'Subscription Services',
      description: 'Token-gated access to recurring services or content.',
      example: 'Newsletter creator requires holding 100 NEWS tokens to access premium content.',
    },
    {
      icon: Target,
      title: 'Crowdfunding',
      description: 'Raise funds by selling tokens that represent future value or governance rights.',
      example: 'Indie game studio raises $50,000 by selling GAME tokens that will be usable in-game at launch.',
    },
  ];

  return (
    <div className="space-y-12 animate-in max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          How ContractForge Works
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Build and deploy smart contracts in minutes, not months.
          No coding required. Start earning with blockchain today.
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link to="/builder" className="btn-primary flex items-center gap-2 px-8 py-4 text-lg">
            <Play className="w-5 h-5" />
            Start Building Free
          </Link>
          <Link to="/templates" className="btn-secondary flex items-center gap-2 px-8 py-4 text-lg">
            <BookOpen className="w-5 h-5" />
            Browse Templates
          </Link>
        </div>
      </div>

      {/* 6 Steps Section */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          6 Simple Steps to Deploy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br opacity-10 rounded-bl-full"
                   style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4`}>
                <step.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-slate-500 bg-slate-700 px-2 py-1 rounded">
                  STEP {step.number}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm mb-4">{step.description}</p>
              <ul className="space-y-2">
                {step.details.map((detail, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* What You Can Build */}
      <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          What You Can Build
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whatYouCanBuild.map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                <p className="text-slate-400 text-sm mb-2">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.examples.map((example) => (
                    <span key={example} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Make Money Section */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <DollarSign className="w-8 h-8 text-green-400" />
            How to Make Money
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Here are proven ways people are earning real money using no-code smart contract builders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moneyMakingStrategies.map((strategy) => (
            <div key={strategy.title} className="card hover:border-green-500/30 transition-all">
              <div className={`w-full h-2 rounded-t-lg bg-gradient-to-r ${strategy.color} -mt-6 -mx-6 mb-6`}
                   style={{ width: 'calc(100% + 48px)' }} />
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${strategy.color} flex items-center justify-center mb-4`}>
                <strategy.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{strategy.title}</h3>
              <p className="text-slate-400 text-sm mb-4">{strategy.description}</p>

              <div className="mb-4">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">How to do it:</p>
                <ul className="space-y-1">
                  {strategy.howTo.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-green-400 font-bold">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div>
                  <p className="text-xs text-slate-500">Potential</p>
                  <p className="text-green-400 font-bold">{strategy.potential}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Difficulty</p>
                  <p className={`font-medium ${
                    strategy.difficulty === 'Easy' ? 'text-green-400' :
                    strategy.difficulty === 'Medium' ? 'text-yellow-400' : 'text-orange-400'
                  }`}>{strategy.difficulty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real World Use Cases */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Real-World Examples
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase) => (
            <div key={useCase.title} className="card">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <useCase.icon className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{useCase.title}</h3>
                  <p className="text-slate-400 text-sm mb-3">{useCase.description}</p>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Example:</p>
                    <p className="text-sm text-slate-300">{useCase.example}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-primary-900/50 to-purple-900/50 rounded-2xl p-8 border border-primary-500/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-white">5 min</p>
            <p className="text-slate-400 text-sm">Build your first contract</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">$0</p>
            <p className="text-slate-400 text-sm">Free to start (pay only gas)</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">90%</p>
            <p className="text-slate-400 text-sm">Time saved vs coding</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">10+</p>
            <p className="text-slate-400 text-sm">Supported networks</p>
          </div>
        </div>
      </div>

      {/* Testnet Faucets */}
      <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Get Free Test Tokens
        </h2>
        <p className="text-slate-400 text-center mb-6">
          Use these faucets to get free test tokens for practicing deployments.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="https://sepoliafaucet.com" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Coins className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white font-medium">Sepolia Faucet</p>
              <p className="text-slate-400 text-sm">Ethereum testnet</p>
            </div>
          </a>
          <a href="https://faucet.polygon.technology" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Coins className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-white font-medium">Polygon Amoy Faucet</p>
              <p className="text-slate-400 text-sm">Polygon testnet</p>
            </div>
          </a>
          <a href="https://testnet.bnbchain.org/faucet-smart" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Coins className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-white font-medium">BSC Testnet Faucet</p>
              <p className="text-slate-400 text-sm">BNB Chain testnet</p>
            </div>
          </a>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Ready to Start?
        </h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Join thousands of creators building on blockchain without code.
          Your first contract is just minutes away.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/builder" className="btn-primary flex items-center gap-2 px-8 py-4">
            <Zap className="w-5 h-5" />
            Create Your First Contract
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
