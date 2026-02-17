import { Link } from 'react-router-dom';
import {
  Rocket,
  ExternalLink,
  CheckCircle,
  Clock,
  XCircle,
  ArrowRight,
  Shield,
  Copy,
} from 'lucide-react';
import { useContractStore } from '../store/contractStore';
import toast from 'react-hot-toast';

export default function Deployments() {
  const { deployments } = useContractStore();

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast.success('Address copied!');
  };

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

  if (deployments.length === 0) {
    return (
      <div className="animate-in">
        <h1 className="text-3xl font-bold text-white mb-8">Deployments</h1>
        <div className="flex flex-col items-center justify-center py-24 card">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-primary-500/20">
            <Rocket className="w-9 h-9 text-primary-400 float" />
          </div>
          <h2 className="text-xl font-semibold text-white">No Deployments Yet</h2>
          <p className="text-slate-400 text-sm mt-2 max-w-md text-center">
            Build your smart contract with the visual builder, then deploy it to any supported blockchain with one click.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <Link to="/builder" className="btn-primary">
              <Rocket className="w-4 h-4" />
              Open Builder
            </Link>
            <Link to="/templates" className="btn-secondary">
              Browse Templates
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-700/50 w-full max-w-lg">
            {[
              { label: 'Build', desc: 'Drag & drop blocks' },
              { label: 'Generate', desc: 'One-click compilation' },
              { label: 'Deploy', desc: 'To 10+ chains' },
            ].map((step, i) => (
              <div key={step.label} className="text-center">
                <div className="w-8 h-8 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-2 text-primary-400 text-sm font-bold ring-1 ring-primary-500/20">
                  {i + 1}
                </div>
                <p className="text-sm font-medium text-white">{step.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Deployments</h1>
          <p className="text-slate-400 mt-1">
            Track and manage your deployed smart contracts
          </p>
        </div>
        <Link to="/builder" className="btn-primary">
          <Rocket className="w-4 h-4" />
          New Deployment
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card">
          <p className="text-3xl font-bold text-white">{deployments.length}</p>
          <p className="text-sm text-slate-400">Total Deployments</p>
        </div>
        <div className="card">
          <p className="text-3xl font-bold text-green-400">
            {deployments.filter((d) => d.status === 'confirmed').length}
          </p>
          <p className="text-sm text-slate-400">Confirmed</p>
        </div>
        <div className="card">
          <p className="text-3xl font-bold text-white">
            {new Set(deployments.map((d) => d.network.id)).size}
          </p>
          <p className="text-sm text-slate-400">Networks Used</p>
        </div>
      </div>

      {/* Deployments List */}
      <div className="space-y-3 stagger-in">
        {deployments.map((deployment) => (
          <div
            key={deployment.id}
            className="card flex items-center justify-between gap-4 hover:border-slate-600/80 transition-colors"
          >
            <div className="flex items-center gap-4">
              {getStatusIcon(deployment.status)}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white">
                    {deployment.contractName}
                  </h3>
                  {deployment.verified && (
                    <span className="badge-success">
                      <Shield className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${deployment.network.color}15`,
                      color: deployment.network.color,
                    }}
                  >
                    {deployment.network.name}
                  </span>
                  <span className="text-xs text-slate-500">
                    {new Date(deployment.deployedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {deployment.address && (
                <button
                  onClick={() => handleCopyAddress(deployment.address)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/50 rounded-lg text-xs text-slate-300 font-mono hover:bg-slate-700 transition-colors"
                >
                  {deployment.address.slice(0, 6)}...{deployment.address.slice(-4)}
                  <Copy className="w-3 h-3 text-slate-400" />
                </button>
              )}
              <a
                href={`${deployment.network.explorerUrl}/tx/${deployment.transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-colors"
                title="View on Explorer"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
