import { ReactNode, createContext, useState } from "react";

export const WalletContext = createContext<any>(null);

export interface IWalletProviderProps {
  children: ReactNode;
}

export default function WalletProvider({ children }: IWalletProviderProps) {
  const [walletId, setWalletId] = useState<string>();

  return (
    <WalletContext.Provider value={{ walletId, setWalletId }}>
      {children}
    </WalletContext.Provider>
  );
}
