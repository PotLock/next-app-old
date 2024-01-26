import { Wallet } from "@/configs/nearWallet";

export default function useProfileWallet() {
  const getProfile = async (account: string) => {
    const wallet = new Wallet({
      createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_ID,
      network: "mainnet",
    });
    await wallet.startUp();
    let state = await wallet.viewMethod({
      contractId: "social.near",
      method: "get",
      args: { keys: [`${account}/profile/**`] },
    });
    return state;
  };

  return { getProfile };
}
