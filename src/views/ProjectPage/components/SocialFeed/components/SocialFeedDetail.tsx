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
import Banner from "../../../../../assets/images/banner-projects.png";
import Avatar from "../../../../../assets/images/Avatar.png";
import { Input, Button } from "@nextui-org/react";
import { IconAction, IconArrowDown, IconArrowUp } from "@/assets/icons";

export interface ISocialFeedDetailProps { }

export default function SocialFeedDetailPage(props: ISocialFeedDetailProps) {
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
      <div className="w-full pt-[24px]">
        <Card className="w-full">
          <CardHeader className="flex gap-3">
            <div className="flex gap-[16px] w-full">
              <div>
                <Image src={Avatar} alt="avatar imgs" width={32} height={32} />
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-col">
                  <p className="text-md">DecntralMedia</p>
                  <div className="flex items-center gap-[8px] text-small text-default-500">
                    @basedev.near <IconDots /> 15hrs ago
                  </div>
                </div>
                <div><IconShare />
                </div>
              </div>
            </div>
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
          <CardFooter className="flex flex-col gap-[24px] items-center px-[24px] py[12px]">
            <div className="w-full flex gap-[24px]">
            {DATA_CONNECT?.map((item, index) => (
              <div key={index} className="flex gap-[8px] items-center">
                {item?.icons}
                {item?.number}
              </div>
            ))}
            </div>
            <div className="border-t-2">
              <div className="w-full flex my-[24px]">
                <div className="w-[5%]">
                <Image src={Avatar} alt="avatar imgs" width={32} height={32} />
                </div>
                <div className="w-[93%]">
                  <Input radius="none" type="text" placeholder="Type something" />
                </div>
              </div>
              <div className="py-[24px] flex">
                <div className="w-[5%]">
                <Image src={Avatar} alt="avatar imgs" width={32} height={32} />
                </div>
                <div className="w-[95%]">
                  <div className="font-semibold">Name</div>
                  <div className="flex items-center gap-[8px] font-normal text-[#7B7B7B]">@Project ID <IconDots /> 15hrs ago</div>
                  <div className="my-[16px] text-[#29292] text-[14px] font-normal">Lorem ipsum dolor sit amet consectetur. Ac vulputate elit in arcu in aliquet arcu aliquam velit. Amet nibh amet aliquet luctus viverra egestas a molestie. Et semper dignissim eu magnis at. In id sed placerat commodo amet cursus volutpat. </div>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
