import { create } from 'zustand';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  balance: string | null;

  connect: (address: string, chainId: number) => void;
  disconnect: () => void;
  setBalance: (balance: string) => void;
  setChainId: (chainId: number) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  address: null,
  chainId: null,
  balance: null,

  connect: (address, chainId) =>
    set({
      isConnected: true,
      address,
      chainId,
    }),

  disconnect: () =>
    set({
      isConnected: false,
      address: null,
      chainId: null,
      balance: null,
    }),

  setBalance: (balance) => set({ balance }),
  setChainId: (chainId) => set({ chainId }),
}));
