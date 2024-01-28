"use client";
import EmptyState from "@/components/EmptyState";
import PotsPage from "@/views/ProjectPage/components/Pots/Pots";
import EmptyPot from '../../../../assets/images/EmptyPot.png'
import React from "react";
import Image from "next/image";

export interface IPotsProps {}

export default function Pots(props: IPotsProps) {
  return (
    <div>
      {/* <PotsPage /> */}
      <EmptyState title1="Hold Up" title2="No Pots Available" subtitle="Pots (quadratic funding rounds) will be available in 2 quarters. ">
          <Image alt="" src={EmptyPot}/>
        </EmptyState>
    </div>
  );
}
