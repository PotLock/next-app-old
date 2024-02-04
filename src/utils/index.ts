import { Wallet } from "@/configs/nearWallet";
import { IPFS_BASE_URL } from "@/constant";
import { NetworkId } from "@near-wallet-selector/core";

const NEAR_ACCOUNT_ID_REGEX =
  /^(?=.{2,64}$)(?!.*\.\.)(?!.*-$)(?!.*_$)[a-z\d._-]+$/i;

const validateNearAddress = (address: string) => {
  let isValid = NEAR_ACCOUNT_ID_REGEX.test(address);
  if (address.length < 64 && !address.endsWith(".near")) {
    isValid = false;
  }
  return isValid;
};

const getImageUrlFromSocialImage = async (image: any) => {
  if (image?.url) {
    return image.url;
  } else if (image?.ipfs_cid) {
    return IPFS_BASE_URL + image.ipfs_cid;
  } else if (image?.url) {
    let imageUrl: string = "";
    const wallet = new Wallet({
      createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_ID,
      network: process.env.NEXT_PUBLIC_NETWORK as NetworkId,
    });
    await wallet.startUp();
    await wallet
      .viewMethod({
        contractId: image.nft.contractId,
        method: "nft_token",
        args: {
          token_id: image.nft.tokenId,
        },
      })
      .then((res) => {
        imageUrl = res.metadata.media;
      });
    return IPFS_BASE_URL + imageUrl;
  }
};

export { validateNearAddress, getImageUrlFromSocialImage };
