"use client";
import { ProjectDetail } from "@/app/project/[id]/page";
import { DATA_PROFILE } from "@/constant/project";
import { Button, Chip, Tooltip } from "@nextui-org/react";
import React, { useContext } from "react";

export interface IProfilePageProps {}

export default function IndividualPage(props: IProfilePageProps) {
  const { data } = useContext(ProjectDetail);
  return (
    <div>
      <div>
        <div className="my-2 text-[44px] font-normal text-[#292929]">
          {data?.name}
        </div>
        <div className="my-2 text-[17px] font-normal text-[#7B7B7B]">
          @{data?.project_id}
        </div>
        {/* <div className="flex gap-[12px] my-4">
            {item.status?.map((item) => (
              <div key={item.id}>
                <Chip radius="sm" size="lg">
                  {item?.title}
                </Chip>
              </div>
            ))}
          </div> */}
        <div className="flex items-center justify-between my-4">
          <div>
            <div className="flex gap-[24px]">
              {/* <div className="flex">
                <div className="text-[14px] text-[#292929] font-medium mr-[24px]">
                  Followers
                  <span className="text-[#7B7B7B] pl-2">{item.followers}</span>
                </div>
                <div className="text-[14px] text-[#292929] font-medium">
                  Following
                  <span className="text-[#7B7B7B] pl-2">{item.following}</span>
                </div>
              </div>
              <div className="text-[14px] font-medium text-[#DD3345]">
                Follow
              </div> */}
            </div>
          </div>
          <div>
            <Tooltip content="Comming Soon">
              <Button color="danger" radius="sm" className="mr-[24px]">
                Donate
              </Button>
            </Tooltip>
            <Tooltip content="Comming Soon">
              <Button radius="sm">Add to cart</Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
