/* A helper file that simplifies using the wallet selector */

// near api js
import { providers } from "near-api-js";

// wallet selector UI
import "@near-wallet-selector/modal-ui/styles.css";
import { setupModal } from "@near-wallet-selector/modal-ui";

// wallet selector options
import type {
  Network,
  NetworkId,
  WalletSelector,
  Wallet as WalletSelectorWallet,
} from "@near-wallet-selector/core";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { setupCoin98Wallet } from "@near-wallet-selector/coin98-wallet";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";

const THIRTY_TGAS = "30000000000000";
export const NO_DEPOSIT = "0";

type WalletProps = {
  createAccessKeyFor?: string;
  network?: NetworkId | Network;
};

// Wallet that simplifies using the wallet selector
export class Wallet {
  walletSelector?: WalletSelector;
  wallet?: WalletSelectorWallet | null;
  network: NetworkId | Network | undefined;
  createAccessKeyFor: string | undefined;
  accountId: string | undefined;

  constructor(
    props: WalletProps = {
      createAccessKeyFor: "donate.potlock.near",
      network: "mainnet",
    },
  ) {
    const { createAccessKeyFor, network } = props;
    this.createAccessKeyFor = createAccessKeyFor;
    this.network = network;
  }

  // To be called when the website loads
  async startUp() {
    if (!this.network) {
      throw new Error("Network not set by passing it to the constructor");
    }

    this.walletSelector = await setupWalletSelector({
      network: this.network,
      modules: [
        setupMyNearWallet({}),
        setupHereWallet({}),
        setupCoin98Wallet({}),
        setupNearWallet({}),
        setupMeteorWallet({}),
        setupSender({}),
      ],
    });

    const isSignedIn = this.walletSelector.isSignedIn();

    // If user is signed in, update fields, otherwise do nothing
    if (isSignedIn) {
      const accountState = this.walletSelector.store.getState().accounts[0];

      if (!accountState) {
        return;
      }

      this.wallet = await this.walletSelector.wallet();
      this.accountId = accountState.accountId;
      if (this.wallet.id && !localStorage.getItem("reloaded")) {
        localStorage.setItem("reloaded", "true");
        setTimeout(() => {
          window.location.reload();
        }, 50); // 0.5s delay before reloading the page
      }
    } else {
      localStorage.removeItem("reloaded");
    }
    return isSignedIn;
  }

  // Sign-in method
  signIn() {
    if (!this.walletSelector) {
      throw new Error(
        "Wallet selector not initialized by running startUp() first",
      );
    }

    const description = "Please select a wallet to sign in.";
    const modal = setupModal(this.walletSelector, {
      contractId: this.createAccessKeyFor || "",
      description,
    });
    modal.show();
  }

  // Sign-out method
  signOut() {
    if (!this.wallet) {
      throw new Error("Wallet not initialized by running startUp() first");
    }

    this.wallet.signOut();
    this.wallet = this.accountId = this.createAccessKeyFor = undefined;
    window.location.replace(window.location.origin + window.location.pathname);
  }

  // Make a read-only call to retrieve info.rmation from the network
  async viewMethod({
    contractId,
    method,
    args = {},
  }: {
    contractId?: string;
    method: string;
    args?: Record<string, unknown>;
  }) {
    if (!this.walletSelector) {
      throw new Error(
        "Wallet selector not initialized by running startUp() first",
      );
    }
    const { network } = this.walletSelector.options;
    const provider = new providers.JsonRpcProvider({
      url: network.nodeUrl,
    });

    const res = await provider.query({
      request_type: "call_function",
      account_id: contractId,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
      finality: "optimistic",
    });

    // @ts-ignore
    return JSON.parse(Buffer.from(res.result).toString());
  }

  // Call a method that changes the contract's state
  async callMethod({
    contractId,
    method,
    args = {},
    gas = THIRTY_TGAS,
    deposit = NO_DEPOSIT,
  }: {
    contractId: string;
    method: string;
    args?: Record<string, unknown>;
    gas?: string;
    deposit?: string;
  }) {
    if (!this.wallet) {
      this.signIn();
    }
    // Sign a transaction with the "FunctionCall" action
    if (this.wallet) {
      return await this.wallet.signAndSendTransaction({
        signerId: this.accountId,
        receiverId: contractId,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: method,
              args,
              gas,
              deposit,
            },
          },
        ],
      });
    }
  }
}
