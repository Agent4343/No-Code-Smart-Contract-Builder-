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
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/how-it-works', icon: BookOpen, label: 'How It Works' },
  { to: '/builder', icon: Puzzle, label: 'Builder' },
  { to: '/templates', icon: FileCode, label: 'Templates' },
  { to: '/deployments', icon: Rocket, label: 'Deployments' },
  { to: '/marketplace', icon: Store, label: 'Marketplace' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-800/50 border-r border-slate-700 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
            <Blocks className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">ContractForge</h1>
            <p className="text-xs text-slate-400">No-Code Builder</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <div className="bg-gradient-to-r from-primary-900/50 to-purple-900/50 rounded-lg p-4">
          <p className="text-sm text-slate-300 font-medium">Need Help?</p>
          <p className="text-xs text-slate-400 mt-1">
            Check our documentation or contact support.
          </p>
          <button className="mt-3 text-xs text-primary-400 hover:text-primary-300 font-medium">
            View Docs →
          </button>
        </div>
      </div>
    </aside>
  );
}
