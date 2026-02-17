import { Bell, Search, Command } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <header className="h-14 bg-slate-800/30 border-b border-slate-700/50 flex items-center justify-between px-6 backdrop-blur-sm">
      {/* Search */}
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-slate-300 transition-colors" />
          <input
            type="text"
            placeholder="Search contracts, templates..."
            className="w-full bg-slate-800/50 border border-slate-700/80 rounded-lg pl-10 pr-20 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/50 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-slate-600">
            <kbd className="px-1.5 py-0.5 bg-slate-700/50 border border-slate-600/50 rounded text-[10px] font-mono">
              <Command className="w-2.5 h-2.5 inline" />
            </kbd>
            <kbd className="px-1.5 py-0.5 bg-slate-700/50 border border-slate-600/50 rounded text-[10px] font-mono">K</kbd>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Status indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-500/5 border border-green-500/20 rounded-full">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-green-400 font-medium">All Systems Operational</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full ring-2 ring-slate-900" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-700" />

        {/* RainbowKit Wallet Connect Button */}
        <ConnectButton
          chainStatus="icon"
          showBalance={false}
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }}
        />
      </div>
    </header>
  );
}
