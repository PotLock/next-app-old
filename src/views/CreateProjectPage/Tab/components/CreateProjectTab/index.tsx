"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  CheckboxGroup,
  Divider,
  Input,
  Select,
  SelectItem,
  Tab,
  Tabs,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { SELECTiTEMS, URLINFOR } from "@/constant";
import IconAdd from "@/assets/icons/IconAdd";
import AddFundingModal from "../Modal/AddFundingModal";

const CreateProjectTab = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [onSmartContract, setOnSmartContract] = useState(false);
  const [onFundingSources, setOnFundingSources] = useState(false);
  return (
    <div className="flex flex-col w-full h-full">
      <AddFundingModal isOpen={isOpen} onOpenChange={onOpenChange} />

      <div className="w-full h-full flex">
        <div className="w-1/2 gap-4 flex flex-col">
          <div className="font-semibold">Project details</div>
          <div>
            Lorem ipsum dolor sit amet consectetur. Vel sit nunc in nunc.
            Viverra arcu eu sed consequat.{" "}
          </div>
          <div className="text-[#DB521B]">Required</div>
        </div>
        <div className="w-1/2 gap-6 flex flex-col">
          <div className="flex flex-col gap-2">
            <div className="font-medium">Project name</div>
            <Input size="sm" type="text" placeholder="Placeholder" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-medium">Overview</div>
            <Textarea labelPlacement="outside" placeholder="Type description" />
            <div className="flex justify-end w-full text-[#7B7B7B]">0/320</div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="font-medium">Select category</div>
            <Select size="sm" selectionMode="multiple">
              {SELECTiTEMS.map((items) => (
                <SelectItem key={items.value} value={items.value}>
                  {items.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <CheckboxGroup>
            <Checkbox
              value={"smart contract"}
              onClick={() => setOnSmartContract(!onSmartContract)}
            >
              Yes, my project is has smart contracts
            </Checkbox>
            <Checkbox
              value={"funding"}
              onClick={() => setOnFundingSources(!onFundingSources)}
            >
              Yes, my project have received funding
            </Checkbox>
          </CheckboxGroup>
        </div>
      </div>
      {!!onSmartContract && (
        <>
          <Divider className="my-4" />
          <div className="w-full h-full flex">
            <div className="w-1/2 gap-4 flex flex-col">
              <div className="font-semibold">Smart Contracts</div>
              <div>
                Lorem ipsum dolor sit amet consectetur. Vel sit nunc in nunc.
                Viverra arcu eu sed consequat.{" "}
              </div>
            </div>
            <div className="w-1/2 gap-6 flex flex-col">
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <div className="font-medium">
                    Does your project have smart contracts?{" "}
                  </div>
                  <div className="text-[#7B7B7B]">(optional)</div>
                </div>
                <Select
                  size="sm"
                  placeholder="Yes, my project is a dapp and has smart contracts"
                  selectionMode="multiple"
                >
                  {SELECTiTEMS.map((items) => (
                    <SelectItem key={items.value} value={items.value}>
                      {items.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-medium">Add chain</div>

                <Select
                  size="sm"
                  placeholder="Select chain"
                  selectionMode="multiple"
                >
                  {SELECTiTEMS.map((items) => (
                    <SelectItem key={items.value} value={items.value}>
                      {items.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-medium">Contact address</div>
                <Input size="sm" type="text" placeholder="Placeholder" />
              </div>
            </div>
          </div>
        </>
      )}
      {!!onFundingSources && (
        <>
          <Divider className="my-4" />
          <div className="w-full h-full flex">
            <div className="w-1/2 gap-4 flex flex-col">
              <div className="font-semibold">Funding Sources</div>
              <div>
                <Button onPress={onOpen} color="danger" variant="light">
                  <IconAdd />
                  <p>Add source</p>
                </Button>
              </div>
            </div>
            <div className="w-1/2 gap-6 flex flex-col">
              <div className="flex gap-1">
                <div className="font-medium">$2027.23</div>
                <div className="text-[#7B7B7B]">Donated</div>
              </div>
            </div>
          </div>
        </>
      )}

      <Divider className="my-4" />
      <div className="w-full h-full flex">
        <div className="w-1/2 gap-4 flex flex-col">
          <div className="font-semibold">Social links</div>
          <div>
            Lorem ipsum dolor sit amet consectetur. Vel sit nunc in nunc.
            Viverra arcu eu sed consequat.{" "}
          </div>
          <div>Optional</div>
        </div>
        <div className="w-1/2 gap-6 flex flex-col">
          {URLINFOR.map((url) => (
            <div key={url.label} className="flex flex-col gap-2">
              <div>{url.label}</div>
              <Input
                type="url"
                placeholder="Placeholder"
                labelPlacement="outside"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">
                      {url.href}
                    </span>
                  </div>
                }
              />
            </div>
          ))}
          <Button color="danger">Create new project</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectTab;
