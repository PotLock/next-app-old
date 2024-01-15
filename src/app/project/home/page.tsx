"use client";
import HomePage from "@/views/ProjectPage/components/Home";
import React, { ReactElement } from "react";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  return (
    <div>
      <HomePage />
    </div>
  );
}
