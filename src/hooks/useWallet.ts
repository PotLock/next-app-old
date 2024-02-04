import { Wallet } from "@/configs/nearWallet";
import { NetworkId } from "@near-wallet-selector/core";
import { useEffect, useState } from "react";

export default function useWallet() {
  const [account, setAccount] = useState<string>();

  useEffect(() => {
    const wallet = new Wallet({
      createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_ID,
      network: process.env.NEXT_PUBLIC_NETWORK as NetworkId,
    });

    const getAccount = async () => {
      await wallet.startUp();
      const accountId = wallet.accountId;
      if (accountId) {
        setAccount(wallet.accountId);
      }
    };
    getAccount();
  }, []);

  const handleSignIn = async () => {
    const wallet = new Wallet({
      createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_ID,
      network: process.env.NEXT_PUBLIC_NETWORK as NetworkId,
    });
    await wallet.startUp().then(() => {
      wallet.signIn();
    });
  };

  return { account, handleSignIn };
}
