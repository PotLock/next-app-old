import { Wallet } from "@/configs/nearWallet";
import { useEffect, useState } from "react";

export default function useWallet() {
  const [account, setAccount] = useState<string>();

  useEffect(() => {
    const wallet = new Wallet({
      createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_ID,
      network: "mainnet",
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
  return { account };
}
