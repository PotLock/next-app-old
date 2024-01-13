"use client";
import React from "react";

export interface INotFoundProps {}

export default function NotFound(props: INotFoundProps) {
  return (
    <div className="flex gap-[40px] justify-center items-center">
      <div>
        <div className="text-[#DD3345] font-normal text-[44px]">Oops</div>
        <div className="text-[#292929] font-normal text-[44px]">
          No Attestations Yet
        </div>
        <div>Attestations coming soon.</div>
      </div>
      <div>{/* <NotFoundImg /> */}</div>
    </div>
  );
}
