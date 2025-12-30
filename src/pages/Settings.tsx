import { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Key,
  CreditCard,
  Save,
  ExternalLink,
} from 'lucide-react';
import { useWalletStore } from '../store/walletStore';
import toast from 'react-hot-toast';

export default function Settings() {
  const { address, isConnected } = useWalletStore();
  const [activeTab, setActiveTab] = useState('profile');

  const [settings, setSettings] = useState({
    displayName: '',
    email: '',
    notifications: {
      deployments: true,
      security: true,
      marketing: false,
      updates: true,
    },
    security: {
      twoFactor: false,
      signingRequired: true,
    },
    preferences: {
      theme: 'dark',
      language: 'en',
      gasLimit: 'standard',
      slippage: 0.5,
    },
  });

  const handleSave = () => {
    // Save settings logic here
    toast.success('Settings saved successfully!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Palette },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-6">
                Profile Settings
              </h2>

              <div className="space-y-6">
                {/* Wallet Address */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Wallet Address
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-slate-400 font-mono text-sm">
                      {isConnected ? address : 'Not connected'}
                    </div>
                    {isConnected && (
                      <a
                        href={`https://etherscan.io/address/${address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Display Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={settings.displayName}
                    onChange={(e) =>
                      setSettings({ ...settings, displayName: e.target.value })
                    }
                    placeholder="Enter your display name"
                    className="input-field"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) =>
                      setSettings({ ...settings, email: e.target.value })
                    }
                    placeholder="Enter your email"
                    className="input-field"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Used for important notifications only
                  </p>
                </div>

                <button onClick={handleSave} className="btn-primary">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-6">
                Notification Preferences
              </h2>

              <div className="space-y-4">
                {[
                  {
                    key: 'deployments',
                    label: 'Deployment Updates',
                    description: 'Receive notifications when contracts are deployed',
                  },
                  {
                    key: 'security',
                    label: 'Security Alerts',
                    description: 'Get notified about security issues or suspicious activity',
                  },
                  {
                    key: 'updates',
                    label: 'Platform Updates',
                    description: 'Stay informed about new features and improvements',
                  },
                  {
                    key: 'marketing',
                    label: 'Marketing',
                    description: 'Receive promotional emails and newsletters',
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
                  >
                    <div>
                      <p className="text-white font-medium">{item.label}</p>
                      <p className="text-sm text-slate-400">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={
                          settings.notifications[
                            item.key as keyof typeof settings.notifications
                          ]
                        }
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              [item.key]: e.target.checked,
                            },
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}

                <button onClick={handleSave} className="btn-primary mt-4">
                  <Save className="w-4 h-4" />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-6">
                Security Settings
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div>
                    <p className="text-white font-medium">
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm text-slate-400">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button className="btn-secondary">Enable</button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div>
                    <p className="text-white font-medium">
                      Transaction Signing
                    </p>
                    <p className="text-sm text-slate-400">
                      Require wallet signature for all deployments
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.signingRequired}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          security: {
                            ...settings.security,
                            signingRequired: e.target.checked,
                          },
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-400 font-medium">Security Tip</p>
                  <p className="text-sm text-slate-400 mt-1">
                    Never share your private keys or seed phrase. ContractForge will
                    never ask for them.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-6">
                Application Preferences
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Theme
                  </label>
                  <select
                    value={settings.preferences.theme}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        preferences: {
                          ...settings.preferences,
                          theme: e.target.value,
                        },
                      })
                    }
                    className="input-field"
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light (Coming Soon)</option>
                    <option value="system">System</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Language
                  </label>
                  <select
                    value={settings.preferences.language}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        preferences: {
                          ...settings.preferences,
                          language: e.target.value,
                        },
                      })
                    }
                    className="input-field"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Default Gas Limit
                  </label>
                  <select
                    value={settings.preferences.gasLimit}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        preferences: {
                          ...settings.preferences,
                          gasLimit: e.target.value,
                        },
                      })
                    }
                    className="input-field"
                  >
                    <option value="low">Low (Slower)</option>
                    <option value="standard">Standard</option>
                    <option value="fast">Fast</option>
                    <option value="instant">Instant</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Slippage Tolerance: {settings.preferences.slippage}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={settings.preferences.slippage}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        preferences: {
                          ...settings.preferences,
                          slippage: parseFloat(e.target.value),
                        },
                      })
                    }
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <button onClick={handleSave} className="btn-primary">
                  <Save className="w-4 h-4" />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* API Keys Tab */}
          {activeTab === 'api' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-6">API Keys</h2>

              <div className="space-y-4">
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white font-medium">Production Key</p>
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded">
                      Active
                    </span>
                  </div>
                  <code className="text-sm text-slate-400 font-mono">
                    cf_prod_••••••••••••••••
                  </code>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white font-medium">Test Key</p>
                    <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 text-xs rounded">
                      Test Mode
                    </span>
                  </div>
                  <code className="text-sm text-slate-400 font-mono">
                    cf_test_••••••••••••••••
                  </code>
                </div>

                <button className="btn-secondary">Generate New Key</button>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-6">
                Subscription & Billing
              </h2>

              <div className="space-y-6">
                {/* Current Plan */}
                <div className="p-6 bg-gradient-to-r from-primary-600/20 to-purple-600/20 border border-primary-500/30 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="px-3 py-1 bg-primary-500/20 rounded-full text-primary-400 text-sm font-medium">
                        Current Plan
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-3">
                        Free Plan
                      </h3>
                      <p className="text-slate-400 mt-1">
                        5 deployments per month included
                      </p>
                    </div>
                    <button className="btn-primary">Upgrade Plan</button>
                  </div>
                </div>

                {/* Plan Comparison */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    {
                      name: 'Starter',
                      price: '$29',
                      features: ['25 deployments/mo', 'Basic templates', 'Email support'],
                    },
                    {
                      name: 'Professional',
                      price: '$99',
                      features: [
                        'Unlimited deployments',
                        'Premium templates',
                        'Priority support',
                        'Custom branding',
                      ],
                      popular: true,
                    },
                    {
                      name: 'Enterprise',
                      price: 'Custom',
                      features: [
                        'Everything in Pro',
                        'Dedicated support',
                        'SLA guarantee',
                        'Custom integrations',
                      ],
                    },
                  ].map((plan) => (
                    <div
                      key={plan.name}
                      className={`p-6 rounded-xl border ${
                        plan.popular
                          ? 'border-primary-500 bg-primary-500/5'
                          : 'border-slate-700 bg-slate-800/50'
                      }`}
                    >
                      {plan.popular && (
                        <span className="px-2 py-1 bg-primary-500 text-white text-xs rounded-full">
                          Popular
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-white mt-2">
                        {plan.name}
                      </h3>
                      <p className="text-2xl font-bold text-white mt-2">
                        {plan.price}
                        <span className="text-sm text-slate-400 font-normal">
                          /month
                        </span>
                      </p>
                      <ul className="mt-4 space-y-2">
                        {plan.features.map((feature) => (
                          <li
                            key={feature}
                            className="text-sm text-slate-400 flex items-center gap-2"
                          >
                            <span className="text-green-400">✓</span> {feature}
                          </li>
                        ))}
                      </ul>
                      <button
                        className={`w-full mt-4 ${
                          plan.popular ? 'btn-primary' : 'btn-secondary'
                        }`}
                      >
                        {plan.price === 'Custom' ? 'Contact Sales' : 'Upgrade'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
