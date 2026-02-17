import { Link } from 'react-router-dom';
import {
  Plus,
  FileCode,
  Rocket,
  TrendingUp,
  Clock,
  ArrowRight,
  Coins,
  Image,
  Shield,
  Zap,
  CheckCircle,
  Globe,
  Lock,
} from 'lucide-react';
import { useContractStore } from '../store/contractStore';
import { useTemplateStore } from '../store/templateStore';

export default function Dashboard() {
  const { deployments, nodes } = useContractStore();
  const { templates } = useTemplateStore();

  const stats = [
    {
      label: 'Contracts Built',
      value: nodes.length > 0 ? '1' : '0',
      change: '+100%',
      icon: FileCode,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      ringColor: 'ring-blue-500/20',
    },
    {
      label: 'Deployments',
      value: deployments.length.toString(),
      change: deployments.length > 0 ? '+1' : '0',
      icon: Rocket,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      ringColor: 'ring-green-500/20',
    },
    {
      label: 'Gas Saved',
      value: '~15%',
      change: 'vs manual',
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      ringColor: 'ring-purple-500/20',
    },
    {
      label: 'Time Saved',
      value: '~90%',
      change: 'vs coding',
      icon: Clock,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      ringColor: 'ring-orange-500/20',
    },
  ];

  const quickActions = [
    {
      title: 'ERC-20 Token',
      description: 'Create a fungible token with custom supply and features',
      icon: Coins,
      color: 'from-blue-500 to-blue-600',
      templateId: 'erc20-standard',
    },
    {
      title: 'NFT Collection',
      description: 'Launch your NFT project with minting and royalties',
      icon: Image,
      color: 'from-purple-500 to-purple-600',
      templateId: 'erc721-nft',
    },
    {
      title: 'Staking Pool',
      description: 'Build staking rewards for your token holders',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      templateId: 'staking-pool',
    },
    {
      title: 'Custom Contract',
      description: 'Start from scratch with the visual builder',
      icon: Shield,
      color: 'from-orange-500 to-orange-600',
      templateId: null,
    },
  ];

  const trustSignals = [
    { icon: Shield, label: 'OpenZeppelin Audited', color: 'text-green-400' },
    { icon: Globe, label: '10+ Chains Supported', color: 'text-blue-400' },
    { icon: Lock, label: 'Non-Custodial', color: 'text-purple-400' },
    { icon: Zap, label: '5 Min to Deploy', color: 'text-yellow-400' },
  ];

  return (
    <div className="space-y-8 animate-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 via-primary-900/20 to-purple-900/20 border border-slate-700/50 p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="badge-primary">
                  <Zap className="w-3 h-3" />
                  No Code Required
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white leading-tight">
                Build Smart Contracts
                <span className="gradient-text"> Visually</span>
              </h1>
              <p className="text-lg text-slate-400 mt-3 leading-relaxed">
                Drag, drop, configure, and deploy production-ready smart contracts to 10+ blockchains. Powered by audited OpenZeppelin libraries.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <Link
                  to="/builder"
                  className="btn-primary px-6 py-3 text-base"
                >
                  <Plus className="w-5 h-5" />
                  Start Building
                </Link>
                <Link
                  to="/how-it-works"
                  className="btn-ghost px-6 py-3 text-base text-slate-300"
                >
                  See How It Works
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Trust signals */}
          <div className="flex items-center gap-6 mt-8 pt-6 border-t border-slate-700/50">
            {trustSignals.map((signal) => (
              <div key={signal.label} className="flex items-center gap-2">
                <signal.icon className={`w-4 h-4 ${signal.color}`} />
                <span className="text-sm text-slate-400">{signal.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 stagger-in">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="card flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl ${stat.bgColor} ring-1 ${stat.ringColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="text-xs text-green-400 mt-0.5">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Quick Start</h2>
          <Link
            to="/templates"
            className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center gap-1"
          >
            All Templates <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 stagger-in">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.templateId ? `/builder/${action.templateId}` : '/builder'}
              className="group card hover:border-primary-500/30 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform`}
              >
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-slate-400 mt-1">{action.description}</p>
              <div className="flex items-center gap-1 mt-4 text-primary-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Get Started <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Templates */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Popular Templates</h2>
          <Link
            to="/templates"
            className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.slice(0, 3).map((template) => (
            <Link
              key={template.id}
              to={`/builder/${template.id}`}
              className="card group hover:border-primary-500/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1 line-clamp-2">
                    {template.description}
                  </p>
                </div>
                {template.metadata.audited && (
                  <span className="badge-success flex-shrink-0 ml-3">
                    <CheckCircle className="w-3 h-3" />
                    Audited
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-700/50 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="text-yellow-400">&#9733;</span> {template.rating}
                </span>
                <span>{template.popularity.toLocaleString()} uses</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Deployments */}
      {deployments.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Recent Deployments</h2>
            <Link
              to="/deployments"
              className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="card overflow-hidden p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Contract
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Network
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {deployments.slice(0, 5).map((deployment) => (
                  <tr
                    key={deployment.id}
                    className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors"
                  >
                    <td className="py-3 px-6 text-white font-medium">
                      {deployment.contractName}
                    </td>
                    <td className="py-3 px-6">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${deployment.network.color}15`,
                          color: deployment.network.color,
                        }}
                      >
                        {deployment.network.name}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          deployment.status === 'confirmed'
                            ? 'bg-green-500/10 text-green-400'
                            : deployment.status === 'pending'
                            ? 'bg-yellow-500/10 text-yellow-400'
                            : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          deployment.status === 'confirmed'
                            ? 'bg-green-400'
                            : deployment.status === 'pending'
                            ? 'bg-yellow-400 animate-pulse'
                            : 'bg-red-400'
                        }`} />
                        {deployment.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-slate-400 text-sm">
                      {new Date(deployment.deployedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Social Proof Bar */}
      <div className="flex items-center justify-center gap-8 py-6 border-t border-slate-800">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">10+</p>
          <p className="text-xs text-slate-500">Supported Chains</p>
        </div>
        <div className="w-px h-8 bg-slate-800" />
        <div className="text-center">
          <p className="text-2xl font-bold text-white">30+</p>
          <p className="text-xs text-slate-500">Contract Blocks</p>
        </div>
        <div className="w-px h-8 bg-slate-800" />
        <div className="text-center">
          <p className="text-2xl font-bold text-white">$0</p>
          <p className="text-xs text-slate-500">Free to Start</p>
        </div>
        <div className="w-px h-8 bg-slate-800" />
        <div className="text-center">
          <p className="text-2xl font-bold text-white">100%</p>
          <p className="text-xs text-slate-500">Open Source</p>
        </div>
      </div>
    </div>
  );
}
