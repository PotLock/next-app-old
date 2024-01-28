"use client";
import EmptyState from "@/components/EmptyState";
import FundsRaisedPage from "@/views/ProjectPage/components/FundsRaised/FundsRaised";
import EmptyFunding from '../../../../assets/images/EmptyFunding.png'
import Image from "next/image";
import React from "react";

export interface IRaisedProps {}

export default function Raised(props: IRaisedProps) {
  return (
    <div>
      {/* <FundsRaisedPage /> */}
      <EmptyState title1="This Project" title2="Has No Donations Yet" subtitle="Donate today and help make this public good a public great!">
          <Image alt="" src={EmptyFunding}/>
        </EmptyState>
    </div>
  );
}
