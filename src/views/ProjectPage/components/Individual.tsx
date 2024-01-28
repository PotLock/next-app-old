"use client";
import { DATA_PROFILE } from "@/constant/project";
import { ProjectDetail } from "@/contexts";
import { Button, Chip, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import React, { useContext } from "react";

export interface IProfilePageProps {
  openModal: () => void;
}

export default function IndividualPage(props: IProfilePageProps) {
  const { data } = useContext(ProjectDetail);
  return (
    <div>
      <div>
        <div className="my-2 text-[44px] font-normal text-[#292929]">
          {data?.name || "User Name"}
        </div>
        <div className="my-2 text-[17px] font-normal text-[#7B7B7B]">
          @{data?.project_id}
        </div>
        <div className="flex gap-[12px] my-4">
          <Chip radius="sm" size="lg">
            {data?.tags?.map((item : string) => item)}
          </Chip>
        </div>
        <div className="flex items-center justify-between my-4">
          <div>
            <div className="flex gap-[24px]">
              <div className="flex">
                <div className="text-[14px] text-[#292929] font-medium mr-[24px]">
                  Followers
                  <a href={data?.follower} target="_blank" className="text-[#7B7B7B] pl-2">
                    {data?.numFollowers || "0"}
                  </a>
                </div>
                <div className="text-[14px] text-[#292929] font-medium">
                  Following
                  <a href={data?.following} target="_blank" className="text-[#7B7B7B] pl-2">
                    {data?.numFollowing || "0"}
                  </a>
                </div>
              </div>
              <a
                href={data?.following}
                target="_blank"
                className="text-[14px] font-medium text-[#DD3345]"
              >
                Follow
              </a>
            </div>
          </div>
          <div>
            <Button
              color="danger"
              radius="sm"
              className="mr-[24px]"
              onClick={props.openModal}
            >
              Donate
            </Button>
            <Button radius="sm">Add to cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
