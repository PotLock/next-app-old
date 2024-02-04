import { IconArrowDown, IconArrowUp } from "@/assets/icons";
import { Button } from "@nextui-org/react";
import { utils } from "near-api-js";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import IconNear from "@/assets/images/IconNear.png";
import Link from "next/link";
import IconProfile from "@/assets/icons/IconProfile";
import { getProjectDetail } from "@/services";

export default function DonatedProjectCard({ data }: { data: any }) {
  const [openBreakDown, setOpenBreakDown] = useState<boolean>(true);
  const [protocolFee, setProtocolFee] = useState<number>(0);
  const [referrerFee, setReferrerFee] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [profileData, setProfileData] = useState<any>(null);

  const toggleBreakdown = useCallback(() => {
    setOpenBreakDown((prev) => !prev);
  }, []);

  // Fetch tx data by hash code
  useEffect(() => {
    setProtocolFee(Number(utils.format.formatNearAmount(data.protocol_fee)));
    setTotalAmount(Number(utils.format.formatNearAmount(data.total_amount)));
    if (data.referrer_fee) {
      setReferrerFee(Number(utils.format.formatNearAmount(data.referrer_fee)));
    }
  }, [data]);

  // Get recipient profile
  useEffect(() => {
    const getProfileData = async (id: string) => {
      const profileData = await getProjectDetail(id);
      setProfileData(profileData.data);
    };

    if (data) {
      getProfileData(data.recipient_id);
    }
  }, [data]);

  return (
    <div className="flex gap-2 flex-col border-b pb-4">
      <Button
        variant="light"
        className="w-full flex items-center justify-between"
        onClick={toggleBreakdown}
      >
        <div className="flex items-center gap-[10px]">
          <div className="rounded-full overflow-hidden w-4 h-4 flex items-center justify-center">
            {profileData ? (
              <Image
                src={profileData.profileImageProcessed}
                alt="profile image"
                width={16}
                height={16}
              />
            ) : (
              <IconProfile />
            )}
          </div>
          <p className="text-sm">{profileData?.name}</p>
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
            <p>Project allocation ({data?.referrer_id ? "92.5%" : "95%"})</p>
            <div className="flex items-center gap-2">
              <p>{(totalAmount - referrerFee - protocolFee).toFixed(2)}</p>
              <Image width={20} height={20} src={IconNear} alt="" />
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <p>Protocol fees (5%) </p>
            <div className="flex items-center gap-2">
              <p>{protocolFee.toFixed(2)}</p>
              <Image width={20} height={20} src={IconNear} alt="" />
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <p>Referral fees ({data?.referrer_id ? "2.5%" : "0%"})</p>
            <div className="flex items-center gap-2">
              <p>{referrerFee.toFixed(2)}</p>
              <Image width={20} height={20} src={IconNear} alt="" />
            </div>
          </div>
          {/*  */}
          <Link
            className="p-2 text-sm w-full truncate border border-[#7B7B7B] rounded-lg"
            href={`https://nearblocks.io/txns/${data?.transactionHash}`}
            target="_blank"
          >
            <span className="text-[#7B7B7B]">Txn Hash : </span>
            <span>{data?.transactionHash}</span>
          </Link>
        </div>
      )}
    </div>
  );
}
