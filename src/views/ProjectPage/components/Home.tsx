"use client";
import { DATA_ABOUT, DATA_OVERVIEW } from "@/constant/project";
import { ProjectDetail } from "@/contexts";
import React, { useContext } from "react";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from 'rehype-raw'

export interface IContentProps {}

export default function HomePage() {
  const { data } = useContext(ProjectDetail);
  return (
    <div>
      <div className="text-[14px] text-[#7B7B7B] font-medium py-[24px]">
        About
      </div>
      <div className="w-full flex gap-[40px] pb-[24px]">
        <div className="w-[33%] flex items-end gap-2 px-[24px] py-[16px] rounded-md bg-[#FEF6EE]">
          <div className="text-[32px] font-normal">
            ${data?.totalContributed}
          </div>
          <div className="pb-[6px] font-normal text-[17px] text-[#EA6A25]">
            Contributed
          </div>
        </div>
        <div className="w-[33%] flex items-end gap-2 px-[24px] py-[16px] rounded-md bg-[#FEF6EE]">
          <div className="text-[32px] font-normal">$0</div>
          <div className="pb-[6px] font-normal text-[17px] text-[#EA6A25]">
            Donors
          </div>
        </div>
        <div className="w-[33%] flex items-end gap-2 px-[24px] py-[16px] rounded-md bg-[#FEF6EE]">
          <div className="text-[32px] font-normal">
            ${data?.totalReferralFees}
          </div>
          <div className="pb-[6px] font-normal text-[17px] text-[#EA6A25]">
            Total matched
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex py-[24px]">
          <div className="w-[35%] pr-[40px] text-[#292929] text-[17px] font-semibold">
            Overview
          </div>
          <div className="w-[65%] text-[#7B7B7B] text-[17px] font-normal">
           
            <Markdown remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]}>
               {data?.description}
            </Markdown>
          </div>
        </div>
        <div className="flex py-[24px]">
          <div className="w-[35%] pr-[40px] text-[#292929] text-[17px] font-semibold">
            Team members
          </div>
          <div className="w-[65%] text-[#7B7B7B] text-[17px] font-normal"></div>
        </div>
      </div>
    </div>
  );
}
