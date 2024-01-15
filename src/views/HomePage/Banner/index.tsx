"use client";
import { ITEMSBANNER } from "@/constant";
import { getProjectGeneral } from "@/services";
import DonationRandomlyModel from "@/views/HomePage/DonationRandomly/DonationRandomlyModal";
import DonationRandomlyModelFinal from "@/views/HomePage/DonationRandomly/DonationRandomlyModalFinal";
import { Button, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Banner = () => {
  const route = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [data, setData] = useState<any>();

  const getDataDetail = async () => {
    try {
      const { data } = await getProjectGeneral();
      const dataDetail = [
        {
          number: data?.uniqueDonors,
          title: "Unique Donors",
        },
        {
          number: data?.totalContributed,
          title: "Donated",
        },
        {
          number: data?.donationQuantity,
          title: "Donations",
        },
      ];
      setData(dataDetail);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataDetail();
  }, []);

  return (
    <div className="w-full  flex items-center justify-center my-[160px] ">
      <DonationRandomlyModel
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
      <div className="flex gap-6 items-center justify-center  flex-col text-center">
        <div className="text-sm font-medium text-[#292929]">
          Transforming Funding for Public Goods.
        </div>
        <div className="sm:text-6xl  text-4xl  ">
          Discover Impact Projects, <br />
          Donate Directly, Or Get Automatic <br /> Referral Fees For Raising
          Donations.
        </div>

        <div className=" w-full flex  gap-6  mt-4 justify-center items-center">
          <Button color="danger" onPress={onOpen}>
            Donate Randomly
          </Button>
          <Button
            onClick={() => route.push("/create-project")}
            variant="bordered"
          >
            Create Project
          </Button>
        </div>
        <div className="flex sm:flex-row flex-col items-center">
          {data?.map((item: any) => (
            <div
              key={item.title}
              className="flex sm:flex-row flex-col gap-x-2 items-center px-6 py-1"
            >
              <div className="text-[44px] font-semibold">{item.number}</div>
              <div className="mt-4">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
