import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupMintbaseWallet } from "@near-wallet-selector/mintbase-wallet";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupNightly } from "@near-wallet-selector/nightly";
import { setupSender } from "@near-wallet-selector/sender";
import { setupWelldoneWallet } from "@near-wallet-selector/welldone-wallet";
import { CONTRACT_ID, NETWORK } from "./env.config";

const wallet = async () => {
  const selector = await setupWalletSelector({
    network: (NETWORK as any) ?? "testnet",
    modules: [
      setupNearWallet(),
      setupMyNearWallet(),
      setupSender(),
      setupHereWallet(),
      setupNightly(),
      setupMeteorWallet(),
      setupWelldoneWallet(),
      setupMintbaseWallet(),
    ],
  });

  const modal = setupModal(selector, {
    contractId: CONTRACT_ID as any,
  });
  modal.show();
};

export default wallet;
