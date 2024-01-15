"use client";
import React, { ReactNode } from "react";
import IndividualPage from "./components/Individual";
import NavbarPage from "./components/Navbar";
import { DATA_SOCIALS } from "@/constant/project";

export interface IProjectPageProps {
  children?: ReactNode;
}

export default function ProjectPage(props: IProjectPageProps) {
  const { children } = props;

  return (
    <div className="mx-[32px]">
      <div className="flex pt-[24px]">
        <div className="w-[20%] p-[24px]">
          <NavbarPage />
        </div>
        <div className="w-[80%] mx-[36px]">
          <IndividualPage />
        </div>
      </div>
      <div className=" w-full flex border-t-2 ">
        <div className="w-[20%] border-r-2 p-[24px]">
          <div className="text-[14px] font-semibold">Social</div>
          {DATA_SOCIALS?.map((item, index) => (
            <div key={index} className="flex gap-[8px] py-[16px] ">
              {/* {item?.icons} */}
              <div className="text-[14px] font-normal">{item.name}</div>
            </div>
          ))}
        </div>
        <div className="w-[80%] m-[36px]">{children}</div>
      </div>
    </div>
  );
}
