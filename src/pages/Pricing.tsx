import { Link } from 'react-router-dom';
import {
  Check,
  Zap,
  Crown,
  Building2,
  ArrowRight,
  Shield,
  Globe,
  Blocks,
  Sparkles,
  Lock,
  Clock,
  HeadphonesIcon,
} from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started and testing on testnets.',
    color: 'from-slate-500 to-slate-600',
    icon: Zap,
    features: [
      '5 deployments per month',
      'All testnet networks',
      '8 contract templates',
      '30+ building blocks',
      'Basic security scanning',
      'Community support',
    ],
    cta: 'Start Free',
    ctaLink: '/builder',
    popular: false,
  },
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'For builders ready to deploy to mainnet.',
    color: 'from-blue-500 to-blue-600',
    icon: Sparkles,
    features: [
      '25 deployments per month',
      'All mainnet + testnet networks',
      'All templates included',
      'Advanced security scanning',
      'Gas optimization tips',
      'Email support',
      'Export to Hardhat/Foundry',
    ],
    cta: 'Get Started',
    ctaLink: '/settings',
    popular: false,
  },
  {
    name: 'Professional',
    price: '$99',
    period: '/month',
    description: 'For teams and professional contract builders.',
    color: 'from-primary-500 to-purple-600',
    icon: Crown,
    features: [
      'Unlimited deployments',
      'All networks + priority RPC',
      'Premium template library',
      'Full audit reports',
      'Custom branding',
      'Priority support',
      'Team collaboration (3 seats)',
      'API access',
      'Contract verification',
    ],
    cta: 'Go Professional',
    ctaLink: '/settings',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations needing custom solutions.',
    color: 'from-orange-500 to-red-500',
    icon: Building2,
    features: [
      'Everything in Professional',
      'Unlimited team seats',
      'Dedicated account manager',
      'SLA guarantee (99.9%)',
      'Custom integrations',
      'White-label option',
      'On-premise deployment',
      'Formal verification',
      'Custom block development',
    ],
    cta: 'Contact Sales',
    ctaLink: '/settings',
    popular: false,
  },
];

const features = [
  {
    icon: Shield,
    title: 'Audited Contracts',
    description: 'Every template is built on OpenZeppelin audited libraries, the industry standard.',
  },
  {
    icon: Globe,
    title: '10+ Blockchains',
    description: 'Deploy to Ethereum, Polygon, Arbitrum, Base, BNB Chain, and more.',
  },
  {
    icon: Blocks,
    title: '30+ Building Blocks',
    description: 'Tokens, NFTs, DeFi, governance, and utility modules ready to use.',
  },
  {
    icon: Lock,
    title: 'Non-Custodial',
    description: 'Your wallet, your contracts. We never hold your keys or funds.',
  },
  {
    icon: Clock,
    title: 'Deploy in Minutes',
    description: 'Go from idea to deployed contract faster than writing a README.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Expert Support',
    description: 'Our blockchain engineers are ready to help you build and deploy.',
  },
];

export default function Pricing() {
  return (
    <div className="space-y-16 animate-in max-w-6xl mx-auto">
      {/* Hero */}
      <div className="text-center py-8">
        <span className="badge-primary mb-4 inline-flex">
          <Sparkles className="w-3 h-3" />
          Simple Pricing
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
          Start Free, Scale as You
          <span className="gradient-text"> Grow</span>
        </h1>
        <p className="text-xl text-slate-400 mt-4 max-w-2xl mx-auto">
          No hidden fees. Pay only for what you need. Every plan includes access to our visual builder and security scanning.
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative card ${
              plan.popular
                ? 'border-primary-500/50 shadow-xl shadow-primary-500/10 scale-[1.02]'
                : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-primary-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-primary-500/30">
                  Most Popular
                </span>
              </div>
            )}

            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 shadow-lg`}>
              <plan.icon className="w-5 h-5 text-white" />
            </div>

            <h3 className="text-lg font-bold text-white">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-bold text-white">{plan.price}</span>
              {plan.period && (
                <span className="text-sm text-slate-400">{plan.period}</span>
              )}
            </div>
            <p className="text-sm text-slate-400 mt-2">{plan.description}</p>

            <div className="my-6 border-t border-slate-700/50" />

            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              to={plan.ctaLink}
              className={`w-full mt-6 text-center justify-center ${
                plan.popular ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              {plan.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          Every Plan Includes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-in">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0 ring-1 ring-primary-500/20">
                <feature.icon className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-slate-400 mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="card max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: 'Do I need to know Solidity?',
              a: 'No! ContractForge generates production-ready Solidity code from your visual design. You can review and export the code at any time.',
            },
            {
              q: 'What are gas fees?',
              a: 'Gas fees are paid to the blockchain network to process your contract deployment. They vary by network - testnets are free, mainnets require real crypto.',
            },
            {
              q: 'Can I upgrade or downgrade my plan?',
              a: 'Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades apply at the end of your billing cycle.',
            },
            {
              q: 'Are the generated contracts safe?',
              a: 'All contracts are built on OpenZeppelin audited libraries and include our automated security scanning. We recommend professional audits for high-value contracts.',
            },
          ].map((faq) => (
            <details key={faq.q} className="group p-4 bg-slate-700/20 rounded-lg">
              <summary className="text-white font-medium cursor-pointer list-none flex items-center justify-between">
                {faq.q}
                <span className="text-slate-400 group-open:rotate-45 transition-transform text-xl">+</span>
              </summary>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-white">Ready to Build?</h2>
        <p className="text-slate-400 mt-2">Start building your first smart contract for free.</p>
        <Link to="/builder" className="btn-primary inline-flex mt-6 px-8 py-3 text-lg">
          <Zap className="w-5 h-5" />
          Start Building Free
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
