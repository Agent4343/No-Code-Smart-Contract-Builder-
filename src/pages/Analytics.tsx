import {
  BarChart3,
  TrendingUp,
  Users,
  Fuel,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { useContractStore } from '../store/contractStore';

export default function Analytics() {
  const { deployments } = useContractStore();

  // Mock analytics data
  const stats = [
    {
      label: 'Total Deployments',
      value: deployments.length || 12,
      change: '+23%',
      trend: 'up',
      icon: BarChart3,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Active Contracts',
      value: deployments.length || 8,
      change: '+15%',
      trend: 'up',
      icon: Activity,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Total Transactions',
      value: '45.2K',
      change: '+42%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      label: 'Unique Users',
      value: '12.8K',
      change: '+18%',
      trend: 'up',
      icon: Users,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
    },
  ];

  const gasStats = [
    {
      label: 'Total Gas Spent',
      value: '2.45 ETH',
      usdValue: '$6,125',
      change: '-12%',
      trend: 'down',
    },
    {
      label: 'Avg Gas per TX',
      value: '54,231',
      usdValue: '$2.45',
      change: '-8%',
      trend: 'down',
    },
    {
      label: 'Optimized Savings',
      value: '0.32 ETH',
      usdValue: '$800',
      change: '+15%',
      trend: 'up',
    },
  ];

  const contractMetrics = [
    { name: 'MyToken', transactions: 15234, users: 4521, volume: '$2.4M' },
    { name: 'NFTCollection', transactions: 8921, users: 2134, volume: '$890K' },
    { name: 'StakingPool', transactions: 5632, users: 987, volume: '$1.2M' },
    { name: 'DAOGovernance', transactions: 2341, users: 456, volume: '$340K' },
  ];

  const timeSeriesData = [
    { date: 'Mon', transactions: 120, gasUsed: 45000 },
    { date: 'Tue', transactions: 180, gasUsed: 62000 },
    { date: 'Wed', transactions: 150, gasUsed: 51000 },
    { date: 'Thu', transactions: 220, gasUsed: 78000 },
    { date: 'Fri', transactions: 280, gasUsed: 95000 },
    { date: 'Sat', transactions: 190, gasUsed: 67000 },
    { date: 'Sun', transactions: 160, gasUsed: 54000 },
  ];

  const maxTransactions = Math.max(...timeSeriesData.map((d) => d.transactions));

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="text-slate-400 mt-1">
          Monitor your smart contracts' performance and usage
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-white mt-4">{stat.value}</p>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Chart */}
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-4">
            Weekly Transactions
          </h2>
          <div className="flex items-end justify-between h-48 gap-2">
            {timeSeriesData.map((data) => (
              <div
                key={data.date}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div
                  className="w-full bg-primary-500/20 rounded-t hover:bg-primary-500/40 transition-colors"
                  style={{
                    height: `${(data.transactions / maxTransactions) * 100}%`,
                    minHeight: '20px',
                  }}
                />
                <span className="text-xs text-slate-400">{data.date}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
            <span className="text-sm text-slate-400">Total this week</span>
            <span className="text-lg font-semibold text-white">
              {timeSeriesData.reduce((acc, d) => acc + d.transactions, 0).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Gas Usage */}
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-4">Gas Usage</h2>
          <div className="space-y-4">
            {gasStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
              >
                <div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="text-xl font-semibold text-white mt-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500">{stat.usdValue}</p>
                </div>
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded ${
                    stat.trend === 'up'
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-red-500/10 text-red-400'
                  }`}
                >
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span className="text-sm">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contract Metrics Table */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-4">
          Contract Performance
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">
                  Contract
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">
                  Transactions
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">
                  Unique Users
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">
                  Volume
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {contractMetrics.map((contract) => (
                <tr
                  key={contract.name}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="text-white font-medium">{contract.name}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-300">
                        {contract.transactions.toLocaleString()}
                      </span>
                      <span className="text-xs text-green-400">+12%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-300">
                      {contract.users.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-300">{contract.volume}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="card hover:border-primary-500/50 transition-colors text-left">
          <Fuel className="w-8 h-8 text-orange-400 mb-3" />
          <h3 className="text-lg font-semibold text-white">Gas Optimization</h3>
          <p className="text-sm text-slate-400 mt-1">
            Analyze and optimize gas usage across your contracts
          </p>
        </button>
        <button className="card hover:border-primary-500/50 transition-colors text-left">
          <Activity className="w-8 h-8 text-green-400 mb-3" />
          <h3 className="text-lg font-semibold text-white">Real-time Monitoring</h3>
          <p className="text-sm text-slate-400 mt-1">
            Set up alerts for unusual activity or errors
          </p>
        </button>
        <button className="card hover:border-primary-500/50 transition-colors text-left">
          <DollarSign className="w-8 h-8 text-blue-400 mb-3" />
          <h3 className="text-lg font-semibold text-white">Revenue Tracking</h3>
          <p className="text-sm text-slate-400 mt-1">
            Track earnings from fees and royalties
          </p>
        </button>
      </div>
    </div>
  );
}
