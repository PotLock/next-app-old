import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@nextui-org/react";
import Image from "next/image";
import IconNear from "@/assets/images/IconNear.png";
import { useCallback, useContext, useEffect, useState } from "react";
import IconDollar from "@/assets/icons/IconDollars";
import IconProfile from "@/assets/icons/IconProfile";
import {
  IconArrowDown,
  IconArrowUp,
  IconTelegram,
  IconTwitter,
} from "@/assets/icons";
import IconLinkedIn from "@/assets/icons/IconLinkedIn";
import { usePathname, useSearchParams } from "next/navigation";
import { Wallet } from "@/configs/nearWallet";
import axios from "axios";
import { utils } from "near-api-js";
import useNearToUsdt from "@/hooks/useNearToUsdt";
import Link from "next/link";
import { getImageUrlFromSocialImage } from "@/utils";
import { DonateAgainContext } from "@/contexts/DonateAgainContext";
import { NetworkId } from "@near-wallet-selector/core";

export default function DonateSuccessModal({
  isOpen,
  onClose,
  onOpenChange,
}: {
  isOpen: boolean;
  onClose: (path: string, donateAgain: boolean) => void;
  onOpenChange?: () => void;
}) {
  // State
  const [openBreakDown, setOpenBreakDown] = useState<boolean>(true);
  const [donateData, setDonateData] = useState<any>(null);
  const [donorData, setDonorData] = useState<any>(null);
  const [recipientData, setRecipientData] = useState<any>(null);
  const [protocolFee, setProtocolFee] = useState<number>(0);
  const [referrerFee, setReferrerFee] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [donorProfileImageURL, setDonorProfileImageURL] = useState<string>("");
  const [recipientProfileImageURL, setRecipientProfileImageURL] =
    useState<string>("");
  const { setDonateAgain } = useContext(DonateAgainContext);

  // function
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { priceUsdt } = useNearToUsdt();

  useEffect(() => {
    let data = JSON.stringify({
      jsonrpc: "2.0",
      id: "",
      method: "tx",
      params: [
        searchParams.get("transactionHashes"),
        localStorage.getItem("accountId"),
      ],
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: process.env.NEXT_PUBLIC_NEAR_RPC_URL,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response: any) => {
        const jsonString =
          response.data.result.receipts_outcome[0].outcome.logs[3];
        const cleanedString = jsonString.replace("EVENT_JSON:", "");
        const jsonObject = JSON.parse(cleanedString);
        setDonateData(jsonObject.data[0].donation);
        setProtocolFee(
          Number(
            utils.format.formatNearAmount(
              jsonObject.data[0].donation.protocol_fee,
            ),
          ),
        );
        setTotalAmount(
          Number(
            utils.format.formatNearAmount(
              jsonObject.data[0].donation.total_amount,
            ),
          ),
        );
        if (jsonObject.data[0].donation.referrer_fee) {
          setReferrerFee(
            Number(
              utils.format.formatNearAmount(
                jsonObject.data[0].donation.referrer_fee,
              ),
            ),
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchParams]);

  useEffect(() => {
    const getRecipientData = async (account: string) => {
      const wallet = new Wallet({
        createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_ID,
        network: process.env.NEXT_PUBLIC_NETWORK as NetworkId,
      });
      await wallet.startUp();
      const state = await wallet.viewMethod({
        contractId: process.env.NEXT_PUBLIC_SOCIAL_ID,
        method: "get",
        args: { keys: [`${account}/profile/**`] },
      });
      if (Object.keys(state).length !== 0) {
        setRecipientData(state[account].profile);
      }
    };

    const getDonorData = async (account: string) => {
      const wallet = new Wallet({
        createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_ID,
        network: process.env.NEXT_PUBLIC_NETWORK as NetworkId,
      });
      await wallet.startUp();
      const state = await wallet.viewMethod({
        contractId: process.env.NEXT_PUBLIC_SOCIAL_ID,
        method: "get",
        args: { keys: [`${account}/profile/**`] },
      });
      if (Object.keys(state).length !== 0) {
        setDonorData(state[account].profile);
      }
    };

    if (donateData) {
      getRecipientData(donateData.recipient_id);
      getDonorData(donateData.donor_id);
    }
  }, [donateData]);

  const toggleBreakdown = useCallback(() => {
    setOpenBreakDown((prev) => !prev);
  }, []);

  const onExploreClick = useCallback(() => {
    onClose(`/project/${donateData?.recipient_id}`, false);
  }, [donateData?.recipient_id, onClose]);

  const onAgainClick = useCallback(() => {
    setDonateAgain(true);
    onClose(pathname, true);
  }, [pathname, onClose]);

  // Fetch Profile Image URL
  useEffect(() => {
    const fetchProfileImage = async (value: any, type: string) => {
      const url = await getImageUrlFromSocialImage(value);
      if (type === "donor") setDonorProfileImageURL(url);
      if (type === "recipient") setRecipientProfileImageURL(url);
    };

    if (donorData) {
      fetchProfileImage(donorData?.image, "donor");
    }
    if (recipientData) {
      fetchProfileImage(recipientData?.image, "recipient");
    }
  }, [donorData, recipientData]);

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={() => onClose(pathname, false)}
      onOpenChange={onOpenChange}
      className="bg-white rounded-md border border-[#FAFAFA] text-sm"
      size="2xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="flex flex-col gap-6 px-20 py-9">
              <div className="w-16 mx-auto h-16 p-2 rounded-full bg-[#C02031]">
                <IconDollar />
              </div>

              <div className="flex flex-col gap-3">
                {/*  */}
                <div className="mx-auto">
                  <div className="flex gap-2 items-center">
                    <p className=" text-[32px]">{totalAmount}</p>
                    <Image width={28} height={28} src={IconNear} alt="near" />
                  </div>
                  <div className="text-sm text-[#7B7B7B]">
                    {(totalAmount * priceUsdt).toFixed(2)} USDC
                  </div>
                </div>

                {/*  */}
                <div className="mx-auto flex gap-2 items-center">
                  <p className="text-sm font-semibold">Has been donated to</p>
                  <div className="rounded-full items-center flex gap-1 bg-[#F0F0F0] py-[2px] px-[6px]">
                    <div className="rounded-full overflow-hidden w-4 h-4 flex items-center justify-center">
                      {recipientProfileImageURL ? (
                        <Image
                          src={recipientProfileImageURL}
                          alt="profile image"
                          width={16}
                          height={16}
                        />
                      ) : (
                        <IconProfile />
                      )}
                    </div>
                    <Link
                      className="text-sm font-semibold"
                      href={`https://near.social/mob.near/widget/ProfilePage?accountId=${donateData?.recipient_id}`}
                      target="_blank"
                    >
                      {recipientData?.name}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 flex-col">
                <Button
                  variant="light"
                  className="mx-auto"
                  onClick={toggleBreakdown}
                >
                  {openBreakDown ? "Hide breakdown" : "Show breakdown"}
                  {openBreakDown ? <IconArrowUp /> : <IconArrowDown />}
                </Button>
                {openBreakDown && (
                  <div className="text-[#7B7B7B] border-[#DBDBDB]  border p-4 rounded-md flex gap-3 flex-col">
                    <div className="flex w-full items-center justify-between">
                      <p>
                        Project allocation (
                        {donateData?.referrer_id ? "92.5%" : "95%"})
                      </p>
                      <div className="flex items-center gap-2">
                        <p>{totalAmount - referrerFee - protocolFee}</p>
                        <Image width={20} height={20} src={IconNear} alt="" />
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <p>Protocol fees (5%) </p>
                      <div className="flex items-center gap-2">
                        <p>{protocolFee}</p>
                        <Image width={20} height={20} src={IconNear} alt="" />
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <p>
                        Referral fees ({donateData?.referrer_id ? "2.5%" : "0%"}
                        )
                      </p>
                      <div className="flex items-center gap-2">
                        <p>{referrerFee}</p>
                        <Image width={20} height={20} src={IconNear} alt="" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-6">
                <Button
                  variant="solid"
                  className="w-full px-4 py-3"
                  onClick={onAgainClick}
                >
                  Do it again
                </Button>
                <Button
                  variant="solid"
                  className="w-full bg-[#C02031] text-white px-4 py-3"
                  onClick={onExploreClick}
                >
                  Explore projects
                </Button>
              </div>
            </ModalBody>
            <ModalFooter className="flex flex-col gap-2 px-9 py-7">
              {/*  */}
              <div className="mx-auto flex gap-2 items-center">
                <p className="text-sm font-semibold">From</p>
                <div className="rounded-full items-center flex gap-1 bg-[#F0F0F0] py-[2px] px-[6px]">
                  <div className="rounded-full overflow-hidden w-4 h-4 flex items-center justify-center">
                    {donorProfileImageURL ? (
                      <Image
                        src={donorProfileImageURL}
                        alt="profile image"
                        width={16}
                        height={16}
                      />
                    ) : (
                      <IconProfile />
                    )}
                  </div>
                  <Link
                    className="text-sm font-semibold w-max max-w-52 truncate"
                    href={`https://near.social/mob.near/widget/ProfilePage?accountId=${donateData?.donor_id}`}
                    target="_blank"
                  >
                    {donorData && donorData?.name
                      ? donorData.name
                      : donateData?.donor_id}
                  </Link>
                </div>
              </div>

              {/*  */}
              <Link
                className="p-2 mx-auto text-sm w-48 truncate border border-[#7B7B7B] rounded-lg"
                href={`https://nearblocks.io/txns/${searchParams.get("transactionHashes")}`}
                target="_blank"
              >
                <span className="text-[#7B7B7B]">Txn Hash : </span>
                <span>{searchParams.get("transactionHashes")}</span>
              </Link>

              {/*  */}
              <div className="flex py-2 mx-auto gap-2 items-center">
                <p className="text-sm font-semibold text-[#7B7B7B]">Share to</p>
                <Link href={"https://twitter.com/home?lang=en"} target="_blank">
                  <IconTwitter />
                </Link>
                <Link href={"https://web.telegram.org/"} target="_blank">
                  <IconTelegram />
                </Link>
                <Link href={"https://en.linkedin.com/"} target="_blank">
                  <IconLinkedIn />
                </Link>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
