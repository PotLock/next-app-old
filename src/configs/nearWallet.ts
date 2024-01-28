import { providers, utils } from "near-api-js";

// wallet selector UI
import "@near-wallet-selector/modal-ui/styles.css";
import { setupCoin98Wallet } from "@near-wallet-selector/coin98-wallet";
import type {
  Network,
  NetworkId,
  WalletSelector,
  Wallet as WalletSelectorWallet,
} from "@near-wallet-selector/core";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupMathWallet } from "@near-wallet-selector/math-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupNarwallets } from "@near-wallet-selector/narwallets";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupNearFi } from "@near-wallet-selector/nearfi";
import { setupNightly } from "@near-wallet-selector/nightly";
import { setupSender } from "@near-wallet-selector/sender";
import { setupBitgetWallet } from "@near-wallet-selector/bitget-wallet";
import { setupWalletConnect } from "@near-wallet-selector/wallet-connect";
import { setupWelldoneWallet } from "@near-wallet-selector/welldone-wallet";
import { setupNeth } from "@near-wallet-selector/neth";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupXDEFI } from "@near-wallet-selector/xdefi";
import { setupRamperWallet } from "@near-wallet-selector/ramper-wallet";
import { setupNearMobileWallet } from "@near-wallet-selector/near-mobile-wallet";
import { setupMintbaseWallet } from "@near-wallet-selector/mintbase-wallet";
import { Transaction as WSTransaction } from "@near-wallet-selector/core";

const THIRTY_TGAS = "30000000000000";
export const NO_DEPOSIT = "0";

type WalletProps = {
  createAccessKeyFor?: string;
  network?: NetworkId | Network;
};

interface ViewFunctionOptions {
  methodName: string;
  args?: object;
}

interface FunctionCallOptions extends ViewFunctionOptions {
  gas?: string;
  amount?: string;
}

export interface Transaction {
  receiverId: string;
  functionCalls: FunctionCallOptions[];
}

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
        setupMyNearWallet(),
        setupLedger(),
        setupNearWallet(),
        setupSender(),
        setupBitgetWallet(),
        setupMathWallet(),
        setupNightly(),
        setupMeteorWallet(),
        setupNarwallets(),
        setupWelldoneWallet(),
        setupHereWallet(),
        setupCoin98Wallet(),
        setupNearFi(),
        setupRamperWallet(),
        setupNeth({
          gas: "300000000000000",
          bundle: false,
        }),
        setupXDEFI(),
        setupWalletConnect({
          projectId: "c4f79cc...",
          metadata: {
            name: "NEAR Wallet Selector",
            description: "Example dApp used by NEAR Wallet Selector",
            url: "https://github.com/near/wallet-selector",
            icons: ["https://avatars.githubusercontent.com/u/37784886"],
          },
        }),
        setupNearMobileWallet(),
        setupMintbaseWallet(),
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
    callbackURL,
  }: {
    contractId: string;
    method: string;
    args?: Record<string, unknown>;
    gas?: string;
    deposit?: string;
    callbackURL?: string;
  }) {
    if (!this.wallet) {
      this.signIn();
    }
    // Sign a transaction with the "FunctionCall" action
    if (this.wallet) {
      return await this.wallet.signAndSendTransaction({
        signerId: this.accountId,
        receiverId: contractId,
        callbackUrl: callbackURL,
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

  async callMultiMethod(transactions: Transaction[], callbackUrl?: string) {
    const wstransactions: WSTransaction[] = [];
    transactions.forEach((transaction) => {
      wstransactions.push({
        signerId: this.accountId as string,
        receiverId: transaction.receiverId,
        actions: transaction.functionCalls.map((fc) => {
          return {
            type: "FunctionCall",
            params: {
              methodName: fc.methodName,
              args: fc.args ?? {},
              gas: THIRTY_TGAS,
              deposit: utils.format.parseNearAmount(fc.amount || "0")!,
            },
          };
        }),
      });
    });

    return await this.wallet?.signAndSendTransactions({
      transactions: wstransactions,
      callbackUrl,
    });
  }
}
