import { IconArrowDown, IconArrowUp } from "@/assets/icons";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { utils } from "near-api-js";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import IconNear from "@/assets/images/IconNear.png";
import { Wallet } from "@/configs/nearWallet";
import Link from "next/link";
import { getImageUrlFromSocialImage } from "@/utils";
import IconProfile from "@/assets/icons/IconProfile";

export default function DonatedProjectCard({
  transactionHash,
  sumAmountAllProject,
}: {
  transactionHash: string;
  sumAmountAllProject: (amount: number) => void;
}) {
  const [openBreakDown, setOpenBreakDown] = useState<boolean>(true);
  const [recipientData, setRecipientData] = useState<any>(null);
  const [donateData, setDonateData] = useState<any>(null);
  const [protocolFee, setProtocolFee] = useState<number>(0);
  const [referrerFee, setReferrerFee] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [recipientId, setRecipientId] = useState<string>("");
  const [profileImageURL, setProfileImageURL] = useState<string>("");

  const toggleBreakdown = useCallback(() => {
    setOpenBreakDown((prev) => !prev);
  }, []);

  // Fetch tx data by hash code
  useEffect(() => {
    let data = JSON.stringify({
      jsonrpc: "2.0",
      id: "",
      method: "tx",
      params: [transactionHash, localStorage.getItem("accountId")],
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://rpc.mainnet.near.org",
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
        sumAmountAllProject(jsonObject.data[0].donation.total_amount);
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
  }, [transactionHash, sumAmountAllProject]);

  // Get recipient profile
  useEffect(() => {
    const getRecipientData = async (account: string) => {
      const wallet = new Wallet({
        createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_ID,
        network: "mainnet",
      });
      await wallet.startUp();
      const state = await wallet.viewMethod({
        contractId: "social.near",
        method: "get",
        args: { keys: [`${account}/profile/**`] },
      });
      if (Object.keys(state).length !== 0) {
        setRecipientData(state[account].profile);
        setRecipientId(account);
      }
    };

    if (donateData) {
      getRecipientData(donateData.recipient_id);
    }
  }, [donateData]);

  useEffect(() => {
    const fetchProfileImage = async () => {
      const url = await getImageUrlFromSocialImage(recipientData?.image);
      setProfileImageURL(url);
    };

    if (recipientData) {
      fetchProfileImage();
    }
  }, [recipientData]);

  return (
    <div className="flex gap-2 flex-col border-b pb-4">
      <Button
        variant="light"
        className="w-full flex items-center justify-between"
        onClick={toggleBreakdown}
      >
        <div className="flex items-center gap-[10px]">
          <div className="rounded-full overflow-hidden w-4 h-4 flex items-center justify-center">
            {profileImageURL ? (
              <Image
                src={profileImageURL}
                alt="profile image"
                width={16}
                height={16}
              />
            ) : (
              <IconProfile />
            )}
          </div>
          <p className="text-sm">{recipientId}</p>
        </div>
        <div className="flex items-center">
          <div className="flex gap-2 items-center">
            <p className="text-sm">{totalAmount}</p>
            <Image width={14} height={14} src={IconNear} alt="near" />
          </div>
          {openBreakDown ? <IconArrowUp /> : <IconArrowDown />}
        </div>
      </Button>
      {openBreakDown && (
        <div className="text-[#7B7B7B] border-[#DBDBDB]  border p-4 rounded-md flex gap-3 flex-col">
          <div className="flex w-full items-center justify-between">
            <p>
              Project allocation ({donateData?.referrer_id ? "92.5%" : "95%"})
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
            <p>Referral fees ({donateData?.referrer_id ? "2.5%" : "0%"})</p>
            <div className="flex items-center gap-2">
              <p>{referrerFee}</p>
              <Image width={20} height={20} src={IconNear} alt="" />
            </div>
          </div>
          {/*  */}
          <Link
            className="p-2 text-sm w-full truncate border border-[#7B7B7B] rounded-lg"
            href={`https://nearblocks.io/txns/${transactionHash}`}
            target="_blank"
          >
            <span className="text-[#7B7B7B]">Txn Hash : </span>
            <span>{transactionHash}</span>
          </Link>
        </div>
      )}
    </div>
  );
}
