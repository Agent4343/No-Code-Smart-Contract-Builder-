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
    },
    {
      label: 'Deployments',
      value: deployments.length.toString(),
      change: deployments.length > 0 ? '+1' : '0',
      icon: Rocket,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Gas Saved',
      value: '~15%',
      change: 'vs manual',
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      label: 'Time Saved',
      value: '~90%',
      change: 'vs coding',
      icon: Clock,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
    },
  ];

  const quickActions = [
    {
      title: 'ERC-20 Token',
      description: 'Create a fungible token',
      icon: Coins,
      color: 'from-blue-500 to-blue-600',
      templateId: 'erc20-standard',
    },
    {
      title: 'NFT Collection',
      description: 'Launch your NFT project',
      icon: Image,
      color: 'from-purple-500 to-purple-600',
      templateId: 'erc721-nft',
    },
    {
      title: 'Staking Pool',
      description: 'Create staking rewards',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      templateId: 'staking-pool',
    },
    {
      title: 'Custom Contract',
      description: 'Start from scratch',
      icon: Shield,
      color: 'from-orange-500 to-orange-600',
      templateId: null,
    },
  ];

  return (
    <div className="space-y-8 animate-in">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome to ContractForge</h1>
          <p className="text-slate-400 mt-1">
            Build, test, and deploy smart contracts without writing code
          </p>
        </div>
        <Link
          to="/builder"
          className="btn-primary flex items-center gap-2 px-6 py-3"
        >
          <Plus className="w-5 h-5" />
          New Contract
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="card flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="text-xs text-green-400 mt-1">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Quick Start</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.templateId ? `/builder/${action.templateId}` : '/builder'}
              className="group card hover:border-primary-500/50 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4`}
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
              className="card hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {template.name}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1 line-clamp-2">
                    {template.description}
                  </p>
                </div>
                {template.metadata.audited && (
                  <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">
                    Audited
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 mt-4 text-sm text-slate-400">
                <span>⭐ {template.rating}</span>
                <span>📦 {template.popularity.toLocaleString()} uses</span>
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
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">
                    Contract
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">
                    Network
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {deployments.slice(0, 5).map((deployment) => (
                  <tr
                    key={deployment.id}
                    className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="py-3 px-4 text-white font-medium">
                      {deployment.contractName}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{
                          backgroundColor: `${deployment.network.color}20`,
                          color: deployment.network.color,
                        }}
                      >
                        {deployment.network.name}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          deployment.status === 'confirmed'
                            ? 'bg-green-500/10 text-green-400'
                            : deployment.status === 'pending'
                            ? 'bg-yellow-500/10 text-yellow-400'
                            : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {deployment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-sm">
                      {new Date(deployment.deployedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
