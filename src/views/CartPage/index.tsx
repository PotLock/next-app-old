"use client"
import * as React from 'react';
import IconDelete from '@/assets/icons/IconDelete';
import { Checkbox, Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
export interface ICartProps {
}

export default function Cart(props: ICartProps) {
  return (
    <div>
      <h1 className="text-xl font-semibold">Donation cart</h1>
      <div className="flex w-full">
        <div className="w-2/12">
          <Checkbox defaultSelected>Deselect all</Checkbox>
        </div>
        <div className="flex items-center w-2/12">
          <IconDelete /> Delete
        </div>
        <div className="w-2/3">
          2/2 Selected
        </div>
      </div>
      <div>
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">NextUI</p>
              <p className="text-small text-default-500">nextui.org</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/nextui-org/nextui"
            >
              Visit source code on GitHub.
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
