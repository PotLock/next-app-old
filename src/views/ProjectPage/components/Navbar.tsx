"use client";
import { DATA_NAVBAR } from "@/constant/project";
import { useRouter } from "next/navigation";
import React from "react";
import { useParams } from "next/navigation";

export interface INavbarPageProps {}

export default function NavbarPage(props: INavbarPageProps) {
  const router = useRouter();
  const {id} = useParams();
  return (
    <div>
      {DATA_NAVBAR(id)?.map((item:any, index) => (
        <div
          key={index}
          onClick={() => router.push(item.url)}
          className="m-[8px] px-[12px] py-[10px] cursor-pointer rounded-md hover:bg-slate-100"
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
