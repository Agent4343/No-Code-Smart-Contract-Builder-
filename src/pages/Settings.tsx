import { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Key,
  Globe,
  Save,
  Check,
  Crown,
  Zap,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'networks', label: 'Networks', icon: Globe },
  ];

  const handleSave = () => {
    setSaved(true);
    toast.success('Settings saved!');
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="animate-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-slate-400 mt-1">Manage your account and preferences</p>
        </div>
        <button onClick={handleSave} className="btn-primary">
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Tab Navigation */}
        <div className="w-56 flex-shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${
                activeTab === tab.id
                  ? 'bg-primary-600/15 text-primary-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/40'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 space-y-6">
          {activeTab === 'profile' && (
            <>
              <div className="card">
                <h2 className="text-lg font-semibold text-white mb-6">Profile Information</h2>

                {/* Avatar */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    U
                  </div>
                  <div>
                    <button className="btn-secondary text-sm">Change Avatar</button>
                    <p className="text-xs text-slate-500 mt-2">JPG, PNG, or SVG. Max 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter display name"
                      defaultValue=""
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="input-field"
                      placeholder="you@example.com"
                      defaultValue=""
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      className="input-field min-h-[80px] resize-none"
                      placeholder="Tell others about yourself..."
                      defaultValue=""
                    />
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 className="text-lg font-semibold text-white mb-4">Wallet Connection</h2>
                <p className="text-sm text-slate-400 mb-4">
                  Connect your wallet to deploy contracts and sign transactions.
                </p>
                <div className="p-4 bg-slate-700/20 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                      <Globe className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">No wallet connected</p>
                      <p className="text-xs text-slate-500">Connect via the header button</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'notifications' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-white mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: 'Deployment Confirmations', description: 'Get notified when deployments complete', enabled: true },
                  { label: 'Security Alerts', description: 'Alerts for detected vulnerabilities', enabled: true },
                  { label: 'Template Updates', description: 'When templates you use get updated', enabled: false },
                  { label: 'Product Updates', description: 'New features and improvements', enabled: false },
                ].map((pref) => (
                  <div
                    key={pref.label}
                    className="flex items-center justify-between p-4 bg-slate-700/20 rounded-xl"
                  >
                    <div>
                      <p className="font-medium text-white">{pref.label}</p>
                      <p className="text-sm text-slate-400 mt-0.5">{pref.description}</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={pref.enabled} />
                      <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-primary-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-white mb-6">Security Settings</h2>
              <div className="space-y-4">
                <div className="p-4 bg-slate-700/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Two-Factor Authentication</p>
                      <p className="text-sm text-slate-400 mt-0.5">Add an extra layer of security to your account</p>
                    </div>
                    <button className="btn-secondary text-sm">Enable</button>
                  </div>
                </div>
                <div className="p-4 bg-slate-700/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Session Management</p>
                      <p className="text-sm text-slate-400 mt-0.5">Manage active sessions and revoke access</p>
                    </div>
                    <button className="btn-ghost text-sm text-red-400 hover:text-red-300">
                      Revoke All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <>
              <div className="card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">Current Plan</h2>
                    <span className="badge-primary">
                      <Zap className="w-3 h-3" />
                      Free Plan
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-slate-700/20 rounded-xl text-center">
                      <p className="text-2xl font-bold text-white">5</p>
                      <p className="text-xs text-slate-500 mt-1">Deploys / Month</p>
                    </div>
                    <div className="p-4 bg-slate-700/20 rounded-xl text-center">
                      <p className="text-2xl font-bold text-white">0 / 5</p>
                      <p className="text-xs text-slate-500 mt-1">Used This Month</p>
                    </div>
                    <div className="p-4 bg-slate-700/20 rounded-xl text-center">
                      <p className="text-2xl font-bold text-green-400">Testnets</p>
                      <p className="text-xs text-slate-500 mt-1">Network Access</p>
                    </div>
                  </div>

                  <Link to="/pricing" className="w-full btn-primary justify-center">
                    <Crown className="w-4 h-4" />
                    Upgrade to Pro
                  </Link>
                </div>
              </div>

              <div className="card">
                <h2 className="text-lg font-semibold text-white mb-4">Transaction History</h2>
                <div className="flex flex-col items-center justify-center py-8">
                  <CreditCard className="w-10 h-10 text-slate-600 mb-3" />
                  <p className="text-slate-400 text-sm">No transactions yet</p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'api' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-white mb-2">API Keys</h2>
              <p className="text-sm text-slate-400 mb-6">
                Generate API keys for programmatic access to ContractForge.
              </p>
              <div className="flex flex-col items-center justify-center py-8 border border-dashed border-slate-700 rounded-xl">
                <Key className="w-10 h-10 text-slate-600 mb-3" />
                <p className="text-slate-400 text-sm mb-4">No API keys generated</p>
                <button className="btn-primary text-sm">
                  <Key className="w-4 h-4" />
                  Generate API Key
                </button>
              </div>
            </div>
          )}

          {activeTab === 'networks' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-white mb-2">Network Configuration</h2>
              <p className="text-sm text-slate-400 mb-6">
                Configure RPC endpoints and custom networks for deployments.
              </p>
              <div className="space-y-3">
                {[
                  { name: 'Ethereum Mainnet', color: '#627EEA', status: 'Default' },
                  { name: 'Polygon', color: '#8247E5', status: 'Default' },
                  { name: 'Arbitrum One', color: '#28A0F0', status: 'Default' },
                  { name: 'Base', color: '#0052FF', status: 'Default' },
                  { name: 'BNB Chain', color: '#F0B90B', status: 'Default' },
                ].map((network) => (
                  <div
                    key={network.name}
                    className="flex items-center justify-between p-4 bg-slate-700/20 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: network.color }}
                      />
                      <span className="font-medium text-white">{network.name}</span>
                    </div>
                    <span className="text-xs text-slate-500">{network.status}</span>
                  </div>
                ))}
              </div>
              <button className="btn-secondary mt-4 w-full justify-center text-sm">
                Add Custom Network
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
