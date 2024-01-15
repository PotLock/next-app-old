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
import Search from "./components/Search";
import Banner from "../../../../assets/images/banner-projects.png";
import Avatar from "../../../../assets/images/Avatar.png";

export interface IPotsProps {}

export default function PotsPage(props: IPotsProps) {
  const DATA_CONNECT = [
    {
      id: 1,
      number: 10,
      icons: <IconLike />,
    },
    {
      id: 2,
      number: 10,
      icons: <IconComment />,
    },
    {
      id: 3,
      number: 10,
      icons: <IconRepost />,
    },
  ];

  return (
    <div>
      <Search />
      <div className="pt-[24px]">
        <Card className="w-full">
          <CardHeader className="flex gap-3">
            <div>
              <Image src={Avatar} alt="avatar imgs" width={40} height={40} />
              <div className="flex flex-col">
                <p className="text-md">DecntralMedia</p>
                <div className="flex items-center gap-[8px] text-small text-default-500">
                  @basedev.near <IconDots /> 15hrs ago
                </div>
              </div>
            </div>
            <IconShare />
          </CardHeader>
          <Divider />
          <CardBody className="pl-[54px]">
            <div className="py-[16px]">
              <Image alt="" src={Banner} width={1100} />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur. Ac vulputate elit in arcu
              in aliquet arcu aliquam velit. Amet nibh amet aliquet luctus
              viverra egs a molestie. Et semper dignissim eu magnis at. In id
              sed placerat commodo amet cursus volutpat.{" "}
            </p>
          </CardBody>
          <Divider />
          <CardFooter className="flex gap-[24px] items-center px-[24px] py[12px]">
            {DATA_CONNECT?.map((item, index) => (
              <div key={index} className="flex gap-[8px] items-center">
                {item?.icons}
                {item?.number}
              </div>
            ))}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
