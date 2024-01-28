"use client";
import EmptyState from "@/components/EmptyState";
import AttestationsPage from "@/views/ProjectPage/components/Attestations/Attestations";
import Image from "next/image";
import EmptyAttes from '../../../../assets/images/EmptyAttes.png'
import React from "react";

export interface IAttestationsProps {}

export default function Attestations(props: IAttestationsProps) {
  return (
    <div>
      {/* <AttestationsPage /> */}
     
        <EmptyState title1="Oops!" title2="No Attestations Yet" subtitle="Attestations coming soon.">
          <Image alt="" src={EmptyAttes}/>
        </EmptyState>
    </div>
  );
}
