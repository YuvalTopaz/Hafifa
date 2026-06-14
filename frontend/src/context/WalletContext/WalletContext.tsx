import { createContext } from "react";
import type { CustomerWallet } from "../../Types";

export type WalletContextType = {
  wallet: CustomerWallet | null;
  isLoading: boolean;
  error: string | null;
  refreshWallet: () => Promise<void>;
};

export const WalletContext = createContext<WalletContextType | null>(null);