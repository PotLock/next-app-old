"use client";
import { DATA_ABOUT, DATA_OVERVIEW } from "@/constant/project";
import React from "react";

export interface IContentProps {}

export default function HomePage(props: IContentProps) {
  return (
    <div>
      <div className="text-[14px] text-[#7B7B7B] font-medium py-[24px]">
        About
      </div>
      <div className="w-full flex gap-[40px] pb-[24px]">
        {DATA_ABOUT?.map((item) => (
          <div
            key={item?.id}
            className="w-[33%] flex items-end gap-2 px-[24px] py-[16px] rounded-md bg-[#FEF6EE]"
          >
            <div className="text-[32px] font-normal">{item.value}</div>
            <div className="pb-[6px] font-normal text-[17px] text-[#EA6A25]">
              {item.text}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full">
        {DATA_OVERVIEW?.map((item) => (
          <div key={item.id} className="flex py-[24px]">
            <div className="w-[35%] pr-[40px] text-[#292929] text-[17px] font-semibold">
              {item.title}
            </div>
            <div className="w-[65%] text-[#7B7B7B] text-[17px] font-normal">
              {item?.content}
              {item?.title === "Team members" && (
                <div className="flex gap-[40px]">
                  {item.user?.map((item) => (
                    <div className="flex flex-col items-center" key={item.id}>
                      {/* <User1 /> */}
                      <div className="mt-[16px]">{item.userName}</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="w-full flex justify-between gap-[40px] pb-[24px]">
                {item.socials?.map((item) => (
                  <div
                    key={item?.id}
                    className="w-[33%] flex items-end gap-2 p-[12px] rounded-md bg-[#FEF6EE]"
                  >
                    <div>{item?.icons}</div>
                    <div className="text-[14px] font-normal">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
