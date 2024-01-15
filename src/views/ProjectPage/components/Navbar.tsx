"use client";
import { DATA_NAVBAR } from "@/constant/project";
import { useRouter } from "next/navigation";
import React from "react";

export interface INavbarPageProps {}

export default function NavbarPage(props: INavbarPageProps) {
  const router = useRouter();

  return (
    <div>
      {DATA_NAVBAR?.map((item) => (
        <div
          key={item.id}
          onClick={() => router.push(item.url)}
          className="m-[8px] px-[12px] py-[10px] cursor-pointer rounded-md hover:bg-slate-100"
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
