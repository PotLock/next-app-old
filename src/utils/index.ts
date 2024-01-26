import { IPFS_BASE_URL } from "@/constant";

const NEAR_ACCOUNT_ID_REGEX =
  /^(?=.{2,64}$)(?!.*\.\.)(?!.*-$)(?!.*_$)[a-z\d._-]+$/i;

const validateNearAddress = (address: string) => {
  let isValid = NEAR_ACCOUNT_ID_REGEX.test(address);
  if (address.length < 64 && !address.endsWith(".near")) {
    isValid = false;
  }
  return isValid;
};

const getImageUrlFromSocialImage = (image: any) => {
  if (image?.url) {
    return image.url;
  } else if (image?.ipfs_cid) {
    return IPFS_BASE_URL + image.ipfs_cid;
  }
};

export { validateNearAddress, getImageUrlFromSocialImage };
