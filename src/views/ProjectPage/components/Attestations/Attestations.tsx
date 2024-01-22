"use client";
import React from "react";
import { Input, Button, Image } from "@nextui-org/react";
import { IconAction, IconArrowDown, IconArrowUp } from "@/assets/icons";

export interface IAttestationsProps { }

export default function AttestationsPage(props: IAttestationsProps) {
  return (
    <div>
      <div className="uppercase text-right text-[14px] text-[#7B7B7B] font-medium">Attestations 3</div>
      <div className="w-full flex my-[24px]">
        <div className="w-[5%]">
          <Image
            alt="Card icon"
            className="ml-6 rounded-full border-2 border-white object-cover w-[24px] h-[24px]"
            src="/ProjectLogo.png"
          />
        </div>
        <div className="w-[93%]">
          <Input radius="none" type="text" placeholder="Add an attestation" />
          <div className="flex justify-between mt-[10px]">
            <IconAction />
            <div className="flex gap-[12px]">
              <Button color="default" size="sm">
                Cancel
              </Button>
              <Button color="danger" size="sm">
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-[24px] flex">
        <div className="w-[5%]">
          <Image
            alt="Card icon"
            className="ml-6 rounded-full border-2 border-white object-cover w-[24px] h-[24px]"
            src="/ProjectLogo.png"
          />
        </div>
        <div className="w-[95%]">
         <div className="font-semibold">Name</div>
         <div className="font-normal text-[#7B7B7B]">@Project ID</div>
         <div className="my-[16px] text-[#29292] text-[14px] font-normal">Lorem ipsum dolor sit amet consectetur. Ac vulputate elit in arcu in aliquet arcu aliquam velit. Amet nibh amet aliquet luctus viverra egestas a molestie. Et semper dignissim eu magnis at. In id sed placerat commodo amet cursus volutpat. </div>
         <div className="text-[14px] flex gap-[23px]">
          <div className="flex gap-[8px] items-center">
            <div className="border-2 rounded-[50%] border-indigo-[#000]">
            <IconArrowDown/>
            </div>
            89
          </div>
          <div className="flex gap-[8px] items-center">
          <div className="border-2 rounded-[50%] border-indigo-[#000]">
          <IconArrowUp/> 
            </div>
            8
          </div>
         </div>
        </div>
      </div>
    </div>
  );
}
