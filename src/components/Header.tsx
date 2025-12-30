import { useState } from 'react';
import { Wallet, ChevronDown, Bell, Search, ExternalLink } from 'lucide-react';
import { useWalletStore } from '../store/walletStore';
import { NETWORKS } from '../types/networks';

export default function Header() {
  const { isConnected, address, chainId, connect, disconnect } = useWalletStore();
  const [showNetworkMenu, setShowNetworkMenu] = useState(false);

  const currentNetwork = NETWORKS.find((n) => n.chainId === chainId);

  const handleConnect = async () => {
    // Simulated wallet connection
    // In production, use wagmi/rainbowkit
    if (typeof window !== 'undefined' && (window as unknown as { ethereum?: unknown }).ethereum) {
      try {
        const ethereum = (window as unknown as { ethereum: { request: (args: { method: string }) => Promise<string[]>; on: (event: string, callback: (chainId: string) => void) => void } }).ethereum;
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        const chainIdHex = await ethereum.request({
          method: 'eth_chainId',
        }) as unknown as string;
        connect(accounts[0], parseInt(chainIdHex, 16));
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      // Demo mode - simulate connection
      connect('0x1234...5678', 1);
    }
  };

  const formatAddress = (addr: string) => {
    if (addr.length <= 10) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="h-16 bg-slate-800/50 border-b border-slate-700 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search contracts, templates..."
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Network Selector */}
        {isConnected && (
          <div className="relative">
            <button
              onClick={() => setShowNetworkMenu(!showNetworkMenu)}
              className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: currentNetwork?.color || '#22c55e' }}
              />
              <span className="text-sm text-white">
                {currentNetwork?.name || 'Unknown Network'}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {showNetworkMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
                <div className="p-2">
                  <p className="text-xs text-slate-400 px-3 py-2">Mainnets</p>
                  {NETWORKS.filter((n) => !n.isTestnet).map((network) => (
                    <button
                      key={network.id}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors"
                      onClick={() => setShowNetworkMenu(false)}
                    >
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: network.color }}
                      />
                      <span className="text-sm text-white">{network.name}</span>
                    </button>
                  ))}
                  <div className="border-t border-slate-700 my-2" />
                  <p className="text-xs text-slate-400 px-3 py-2">Testnets</p>
                  {NETWORKS.filter((n) => n.isTestnet).map((network) => (
                    <button
                      key={network.id}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors"
                      onClick={() => setShowNetworkMenu(false)}
                    >
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: network.color }}
                      />
                      <span className="text-sm text-white">{network.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full" />
        </button>

        {/* Wallet */}
        {isConnected ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => disconnect()}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-white font-medium">
                {formatAddress(address!)}
              </span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleConnect}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-white font-medium transition-colors"
          >
            <Wallet className="w-4 h-4" />
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
}
