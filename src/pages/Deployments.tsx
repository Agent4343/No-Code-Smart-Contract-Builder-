import { useState } from 'react';
import {
  Rocket,
  ExternalLink,
  Copy,
  Check,
  Search,
  Filter,
  RefreshCw,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';
import { useContractStore } from '../store/contractStore';
import { NETWORKS } from '../types/networks';
import toast from 'react-hot-toast';

export default function Deployments() {
  const { deployments, generatedContract, selectedNetwork, setSelectedNetwork, isDeploying } =
    useContractStore();
  const [copied, setCopied] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'pending' | 'failed'>(
    'all'
  );

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(null), 2000);
  };

  const filteredDeployments = deployments.filter((d) => {
    const matchesSearch =
      !searchQuery ||
      d.contractName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400 animate-pulse" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Deployments</h1>
          <p className="text-slate-400 mt-1">
            Manage and monitor your deployed smart contracts
          </p>
        </div>
        {generatedContract && (
          <button
            disabled={isDeploying || !selectedNetwork}
            className="btn-primary disabled:opacity-50"
          >
            <Rocket className="w-4 h-4" />
            Deploy Contract
          </button>
        )}
      </div>

      {/* Network Selection */}
      <div className="card">
        <h2 className="text-lg font-semibold text-white mb-4">Select Network</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {NETWORKS.filter((n) => !n.isTestnet).map((network) => (
            <button
              key={network.id}
              onClick={() => setSelectedNetwork(network)}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                selectedNetwork?.id === network.id
                  ? 'border-primary-500 bg-primary-500/10'
                  : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: network.color }}
                />
                <span className="text-sm font-medium text-white">{network.name}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{network.nativeCurrency.symbol}</p>
            </button>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-700">
          <p className="text-sm text-slate-400 mb-3">Testnets</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {NETWORKS.filter((n) => n.isTestnet).map((network) => (
              <button
                key={network.id}
                onClick={() => setSelectedNetwork(network)}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  selectedNetwork?.id === network.id
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: network.color }}
                  />
                  <span className="text-xs font-medium text-white">{network.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Deployments List */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Deployment History</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-1.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as 'all' | 'confirmed' | 'pending' | 'failed')
              }
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-white"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {filteredDeployments.length > 0 ? (
          <div className="overflow-x-auto">
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
                    Address
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">
                    Gas Used
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDeployments.map((deployment) => (
                  <tr
                    key={deployment.id}
                    className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <span className="text-white font-medium">
                        {deployment.contractName}
                      </span>
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
                      <div className="flex items-center gap-2">
                        <code className="text-sm text-slate-300 font-mono">
                          {deployment.address.slice(0, 6)}...{deployment.address.slice(-4)}
                        </code>
                        <button
                          onClick={() => handleCopy(deployment.address, deployment.id)}
                          className="text-slate-400 hover:text-white"
                        >
                          {copied === deployment.id ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(deployment.status)}
                        <span
                          className={`text-sm capitalize ${
                            deployment.status === 'confirmed'
                              ? 'text-green-400'
                              : deployment.status === 'pending'
                              ? 'text-yellow-400'
                              : 'text-red-400'
                          }`}
                        >
                          {deployment.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-sm">
                      {deployment.gasUsed.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-sm">
                      {new Date(deployment.deployedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <a
                          href={`${deployment.network.explorerUrl}/address/${deployment.address}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-400 hover:text-primary-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        {!deployment.verified && (
                          <button className="text-slate-400 hover:text-white text-xs">
                            Verify
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-400">No Deployments Yet</h3>
            <p className="text-sm text-slate-500 mt-2">
              Build a contract and deploy it to see it here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
