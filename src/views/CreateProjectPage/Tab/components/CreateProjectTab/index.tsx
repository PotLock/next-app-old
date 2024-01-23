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
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  projectName: string
  overview: string
  contractAddress: string
  Twitter: string
  linkTelegram: string
  linkGithub: string
  linkWebsite: string
  DAOAddress: string
}

const CreateProjectTab = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [onSmartContract, setOnSmartContract] = useState(false);
  const [onFundingSources, setOnFundingSources] = useState(false);
  const [onDao, setOnDao] = useState(false);
  const [selectCategory, setSelecteCategory] = useState("");
  const [selectChain, setSelecteChain] = useState("");
  const [selectSmartContract, setSelecteSmartContract] = useState("");


  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    data.Twitter = `twitter.com/${data.Twitter}`;
    data.Telegram = `t.me/${data.Telegram}`
    data.Github = `github.com/${data.Github}`
    data.Website = `https://${data.Website}`
    data.category = [...selectCategory]
    const listData = { ...data }
    console.log("👋  listData:", listData)
  }

  const handleSelectCategory = (e: any) => {
    setSelecteCategory(e.target.value);
    setSelecteChain(e.target.value);
    setSelecteSmartContract(e.target.value);
  }

  return (
    <form>
      <div className="flex flex-col w-full h-full">
        <AddFundingModal isOpen={isOpen} onOpenChange={onOpenChange} />
        <div className="w-full h-full flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2 gap-4 flex flex-col">
            <div className="font-semibold">Project details</div>
            <div>Fill in details about your public good project.</div>
            <div className="text-[#DB521B]">Required</div>
          </div>
          <div className="w-full sm:w-1/2 gap-6 flex flex-col">
            <Checkbox onClick={() => setOnDao(!onDao)}>Register as DAO</Checkbox>
            {!!onDao && (
              <div className="flex flex-col gap-2">
                <div className="font-medium">DAO Address</div>
                <Input size="sm" type="text" placeholder="Placeholder" {...register("DAOAddress")} />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <div className="font-medium">Project name</div>
              <Input size="sm" type="text" placeholder="Placeholder" {...register("projectName")} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-medium">Overview</div>
              <Textarea labelPlacement="outside" placeholder="Type description" {...register("overview")} />
              <div className="flex justify-end w-full text-[#7B7B7B]">0/320</div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="font-medium">Select category</div>
              <Select size="sm" selectionMode="multiple" items={SELECTiTEMS} selectedKeys={selectCategory} onChange={handleSelectCategory}>
                {(options) => <SelectItem key={options.value} value={options.value}>
                  {options.label}
                </SelectItem>
                }
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
            <div className="w-full h-full flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2 gap-4 flex flex-col">
                <div className="font-semibold">Smart Contracts</div>
                <div>
                  Add smart contracts from different chains that belong to your
                  application. (You checked it on the product details)
                </div>
              </div>
              <div className="w-full sm:w-1/2 gap-6 flex flex-col">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1">
                    <div className="font-medium">
                      Does your project have smart contracts?{" "}
                    </div>
                    <div className="text-[#7B7B7B]">(optional)</div>
                  </div>
                  <Select size="sm" placeholder="Yes, my project is a dapp and has smart contracts"
                    selectionMode="multiple" items={SELECTiTEMS} selectedKeys={selectSmartContract} onChange={handleSelectCategory}>
                    {(options) => <SelectItem key={options.value} value={options.value}>
                      {options.label}
                    </SelectItem>
                    }
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-medium">Add chain</div>

                  <Select size="sm" placeholder="Select chain" selectionMode="multiple" items={SELECTiTEMS} selectedKeys={selectChain} onChange={handleSelectCategory}>
                    {(options) => <SelectItem key={options.value} value={options.value}>
                      {options.label}
                    </SelectItem>
                    }
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-medium">Contact address</div>
                  <Input size="sm" type="text" placeholder="Placeholder" {...register("contractAddress")} />
                </div>
              </div>
            </div>
          </>
        )}
        {!!onFundingSources && (
          <>
            <Divider className="my-4" />
            <div className="w-full h-full flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2 gap-4 flex flex-col">
                <div className="font-semibold">Funding Sources</div>
                <div>
                  Add the funding sources that you currently have before
                  registering to Potlock (You checked it on the product details)
                </div>
                <div>
                  <Button onPress={onOpen} color="danger" variant="light">
                    <IconAdd />
                    <p>Add source</p>
                  </Button>
                </div>
              </div>
              <div className="w-full sm:w-1/2 gap-6 flex flex-col">
                <div className="flex gap-1">
                  <div className="font-medium">$2027.23</div>
                  <div className="text-[#7B7B7B]">Total Funding</div>
                </div>
              </div>
            </div>
          </>
        )}

        <Divider className="my-4" />
        <div className="w-full h-full flex flex-col sm:flex-row gap-4">
          <div className=" w-full sm:w-1/2 gap-4 flex flex-col">
            <div className="font-semibold">Social links</div>
            <div>
              Add all your links to the social media like twitter, telegram,
              github and website.
            </div>
            <div className="text-default-400 text-small">Optional</div>
          </div>
          <div className="w-full sm:w-1/2 gap-6 flex flex-col">
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
                  {...register(url?.label as any)}
                />
              </div>
            ))}
            <Button isDisabled={watch('projectName') && watch('overview') ? false : true} color="danger" onClick={handleSubmit(onSubmit)}>Create new project</Button>

          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateProjectTab;
