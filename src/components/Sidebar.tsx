import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Puzzle,
  FileCode,
  Rocket,
  Store,
  BarChart3,
  Settings,
  Blocks,
  BookOpen,
  Sparkles,
  Crown,
  CreditCard,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/how-it-works', icon: BookOpen, label: 'How It Works' },
  { to: '/builder', icon: Puzzle, label: 'Builder', highlight: true },
  { to: '/templates', icon: FileCode, label: 'Templates' },
  { to: '/deployments', icon: Rocket, label: 'Deployments' },
  { to: '/marketplace', icon: Store, label: 'Marketplace' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/pricing', icon: CreditCard, label: 'Pricing' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-800/50 border-r border-slate-700/50 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
            <Blocks className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">ContractForge</h1>
            <p className="text-xs text-slate-400">No-Code Builder</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <p className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Menu</p>
        <ul className="space-y-0.5">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-primary-600/15 text-primary-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/40'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary-500 rounded-r-full" />
                    )}
                    <item.icon className={`w-[18px] h-[18px] ${isActive ? 'text-primary-400' : 'group-hover:text-slate-300'}`} />
                    <span className="font-medium text-sm">{item.label}</span>
                    {item.highlight && !isActive && (
                      <Sparkles className="w-3 h-3 text-yellow-400 ml-auto" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Upgrade CTA */}
      <div className="p-3">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-600/20 via-purple-600/20 to-primary-600/20 border border-primary-500/20 p-4">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-4 h-4 text-yellow-400" />
              <p className="text-sm text-white font-semibold">Go Pro</p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unlimited deploys, premium templates, and priority support.
            </p>
            <button className="mt-3 w-full bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white text-xs font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-lg shadow-primary-600/20">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>

      {/* Version */}
      <div className="px-4 pb-3 text-center">
        <p className="text-[10px] text-slate-600">ContractForge v1.0.0</p>
      </div>
    </aside>
  );
}
