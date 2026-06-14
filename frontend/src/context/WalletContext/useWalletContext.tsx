import { useContext } from "react";
import { WalletContext } from "./WalletContext";

export function useWalletContext() {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error("useWalletContext must be used inside WalletProvider");
  }

  return context;
}