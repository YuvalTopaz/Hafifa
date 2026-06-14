import type { ReactNode } from "react";
import { WalletContext } from "./WalletContext";
import { useAuth } from "../AuthContext/useAuth";
import { useWallet } from "../../api/hooks";

export function WalletProvider({ children }: { children: ReactNode }) {
  const { user, isCustomer } = useAuth();

  const walletState = useWallet(
    isCustomer ? user?.person_id : undefined,
  );

  return (
    <WalletContext.Provider value={walletState}>
      {children}
    </WalletContext.Provider>
  );
}