"use client";
import { DATA_PROFILE } from "@/constant/project";
import { Button, Chip } from "@nextui-org/react";
import React from "react";

export interface IProfilePageProps {}

export default function IndividualPage(props: IProfilePageProps) {
  return (
    <div>
      {DATA_PROFILE?.map((item, index) => (
        <div key={index}>
          <div className="my-2 text-[44px] font-normal text-[#292929]">
            {item.name}
          </div>
          <div className="my-2 text-[17px] font-normal text-[#7B7B7B]">
            {item.userName}
          </div>
          <div className="flex gap-[12px] my-4">
            {item.status?.map((item) => (
              <div key={item.id}>
                <Chip radius="sm" size="lg">
                  {item?.title}
                </Chip>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between my-4">
            <div>
              <div className="flex gap-[24px]">
                <div className="flex">
                  <div className="text-[14px] text-[#292929] font-medium mr-[24px]">
                    Followers
                    <span className="text-[#7B7B7B] pl-2">
                      {item.followers}
                    </span>
                  </div>
                  <div className="text-[14px] text-[#292929] font-medium">
                    Following
                    <span className="text-[#7B7B7B] pl-2">
                      {item.following}
                    </span>
                  </div>
                </div>
                <div className="text-[14px] font-medium text-[#DD3345]">
                  Follow
                </div>
              </div>
            </div>
            <div>
              <Button color="danger" radius="sm" className="mr-[24px]">
                Donate
              </Button>
              <Button radius="sm">Add to cart</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
