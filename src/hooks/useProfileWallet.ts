import { Wallet } from "@/configs/nearWallet";
import { NetworkId } from "@near-wallet-selector/core";

export default function useProfileWallet() {
  const getProfile = async (account: string) => {
    const wallet = new Wallet({
      createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_ID,
      network: process.env.NEXT_PUBLIC_NETWORK as NetworkId,
    });
    await wallet.startUp();
    let state = await wallet.viewMethod({
      contractId: process.env.NEXT_PUBLIC_SOCIAL_ID,
      method: "get",
      args: { keys: [`${account}/profile/**`] },
    });
    return state;
  };

  return { getProfile };
}
