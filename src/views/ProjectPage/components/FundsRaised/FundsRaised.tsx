"use client";

import React from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react";
import {
  IconComment,
  IconDots,
  IconLike,
  IconRepost,
  IconShare,
} from "@/assets/icons";
import Banner from "../../../../assets/images/banner-projects.png";
import Avatar from "../../../../assets/images/Avatar.png";
import Search from "./components/Search";
import TableRaised from "./components/Table";

export interface IFundsRaisedProps {}

export default function FundsRaisedPage(props: IFundsRaisedProps) {

  return (
    <div>
      <Search />
      <div className="pt-[24px]">
        <TableRaised/>
      </div>
    </div>
  );
}
