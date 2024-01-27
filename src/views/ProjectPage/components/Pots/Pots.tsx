"use client";
import Search from "@/components/Search";
import { DATA_POTS } from "@/constant/project";
import { Chip } from "@nextui-org/react";
import React from "react";

export interface IPotsProps {}

export default function PotsPage(props: IPotsProps) {
  return (
    <div>
      <div className="uppercase text-right my-[24px] text-[14px] text-[#7B7B7B] font-medium">all pots 3</div>
      <Search />
      <div className="w-full flex justify-between flex-wrap">
        {DATA_POTS?.map((item, index)=> (
          <div key={index} className="w-[48%] border-2 mt-[44px] mr-44px]">
          <div className="p-[32px]">
          <div className="overflow-ellipsis line-clamp-1 text-[22px] font-semibold text-[#292929]">{item.title}</div>
          <div className="overflow-ellipsis line-clamp-3 text-[17px] font-normal text-[#525252] mt-[16px]">{item.descripton}</div>
          </div>
          <div className="p-[32px] border-t-2">
          <div className="flex items-end gap-[6px]">
            <div className="text-[22px] font-semibold text-[#292929]">
              {item.valueNear}
            </div >
            <div className="text-[14px] font-normal text-[#292929]">
            {item.valueDola}
            </div>
            <div className="text-[14px] font-semibold text-[#7B7B7B]">
            {item.status}
            </div>
          </div>
          <Chip radius="none" className="mt-[16px]">
          {item.timeOut}
          </Chip>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}
