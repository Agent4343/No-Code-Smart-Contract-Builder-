import { Link } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  Users,
  Fuel,
  Activity,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
} from 'lucide-react';
import { useContractStore } from '../store/contractStore';

export default function Analytics() {
  const { deployments } = useContractStore();

  const stats = [
    {
      label: 'Total Transactions',
      value: '0',
      change: '+0%',
      trend: 'neutral',
      icon: Activity,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Unique Users',
      value: '0',
      change: '+0%',
      trend: 'neutral',
      icon: Users,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Gas Spent',
      value: '0 ETH',
      change: '+0%',
      trend: 'neutral',
      icon: Fuel,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
    },
    {
      label: 'Active Contracts',
      value: deployments.filter((d) => d.status === 'confirmed').length.toString(),
      change: '+0%',
      trend: 'neutral',
      icon: Globe,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
  ];

  if (deployments.length === 0) {
    return (
      <div className="animate-in">
        <h1 className="text-3xl font-bold text-white mb-8">Analytics</h1>
        <div className="flex flex-col items-center justify-center py-24 card">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-primary-500/20">
            <BarChart3 className="w-9 h-9 text-primary-400 float" />
          </div>
          <h2 className="text-xl font-semibold text-white">No Analytics Data Yet</h2>
          <p className="text-slate-400 text-sm mt-2 max-w-md text-center">
            Deploy your first smart contract to start tracking analytics. You'll see transactions, unique users, gas usage, and more.
          </p>
          <Link to="/builder" className="btn-primary mt-6">
            <TrendingUp className="w-4 h-4" />
            Deploy a Contract
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-slate-400 mt-1">
            Monitor your deployed contracts' performance
          </p>
        </div>
        <select className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/40">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>All Time</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 stagger-in">
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trend === 'up'
                    ? 'text-green-400'
                    : stat.trend === 'down'
                    ? 'text-red-400'
                    : 'text-slate-500'
                }`}
              >
                {stat.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                {stat.trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Transaction Volume</h2>
          <div className="flex gap-2">
            {['1D', '1W', '1M', '3M'].map((period) => (
              <button
                key={period}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64 flex items-center justify-center border border-slate-700/30 rounded-xl bg-slate-800/30">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Chart data will appear once contracts have transactions</p>
          </div>
        </div>
      </div>

      {/* Contract Performance */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-4">Contract Performance</h2>
        <div className="space-y-3">
          {deployments.map((deployment) => (
            <div
              key={deployment.id}
              className="flex items-center justify-between p-4 bg-slate-700/20 rounded-xl hover:bg-slate-700/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${deployment.network.color}15` }}
                >
                  <Globe className="w-5 h-5" style={{ color: deployment.network.color }} />
                </div>
                <div>
                  <p className="font-medium text-white">{deployment.contractName}</p>
                  <p className="text-xs text-slate-500">{deployment.network.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-400">
                <div className="text-right">
                  <p className="font-medium text-white">0</p>
                  <p className="text-xs text-slate-500">Transactions</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">0</p>
                  <p className="text-xs text-slate-500">Users</p>
                </div>
                <a
                  href={`${deployment.network.explorerUrl}/address/${deployment.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary-400 hover:text-primary-300"
                >
                  View <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
