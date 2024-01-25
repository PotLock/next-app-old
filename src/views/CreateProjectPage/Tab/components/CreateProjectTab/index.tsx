"use client";
import React, { useContext, useState } from "react";
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
import { useForm, SubmitHandler } from "react-hook-form";
import { BannerCreateContext } from "@/contexts";
import { IconDelete, IconPlus } from "@/assets/icons";
import { WalletContext } from "@/contexts/WalletContext";
import useTags from "@/hooks/useTags";

type Inputs = {
  projectName: string;
  projectId?: string;
  overview: string;
  contractAddress: string;
  Twitter: string;
  linkTelegram: string;
  linkGithub: string;
  linkWebsite: string;
  DAOAddress: string;
  fileBanner: File;
  fileAvatar: File;
};
type TSmartContract = { chain?: string; contactAddress?: string };

const CreateProjectTab = () => {
  const [onSmartContract, setOnSmartContract] = useState(false);
  const [onFundingSources, setOnFundingSources] = useState(false);
  const [onDao, setOnDao] = useState(false);
  const [selectCategory, setSelecteCategory] = useState(new Set());
  const [smartcontracts, setSmartContracts] = useState<TSmartContract[]>([
    { chain: undefined, contactAddress: undefined },
  ]);

  const { bannerImage, avatarImage } = useContext(BannerCreateContext);
  const { walletId } = useContext(WalletContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const listTags = useTags();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    data.Twitter = data.Twitter ? `twitter.com/${data.Twitter}` : "";
    data.Telegram = data.Telegram ? `t.me/${data.Telegram}` : "";
    data.Github = data.Github ? `github.com/${data.Github}` : "";
    data.Website = data.Website ? `https://${data.Website}` : "";
    data.category = [...selectCategory];
    data.fileBanner = bannerImage;
    data.fileAvatar = avatarImage;
    if (smartcontracts.some((item) => item.chain && item.contactAddress)) {
      data.smartcontract = smartcontracts.filter((item) => item.chain);
    }

    const listData = { ...data };
  };

  const handleSelectCategory = (e: any) => {
    setSelecteCategory(new Set([e.target.value]));
  };

  const handleFormChange = (index: number, event: any) => {
    let data: TSmartContract[] = [...smartcontracts];
    data[index][event.target.name as keyof TSmartContract] = event.target.value;
    setSmartContracts(data);
  };

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
            <Checkbox onClick={() => setOnDao(!onDao)}>
              Register as DAO
            </Checkbox>
            {!!onDao && (
              <div className="flex flex-col gap-2">
                <div className="font-medium">DAO Address</div>
                <Input
                  size="sm"
                  type="text"
                  placeholder="Placeholder"
                  {...register("DAOAddress")}
                />
              </div>
            )}
            {!onDao && (
              <div className="flex flex-col gap-2">
                <div className="font-medium">Project ID</div>
                <Input
                  size="sm"
                  type="text"
                  placeholder="Project ID"
                  value={walletId}
                  disabled
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <div className="font-medium">Project name</div>
              <Input
                size="sm"
                type="text"
                placeholder="Placeholder"
                {...register("projectName")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-medium">Overview</div>
              <Textarea
                labelPlacement="outside"
                placeholder="Type description"
                {...register("overview")}
              />
              <div className="flex justify-end w-full text-[#7B7B7B]">
                0/320
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="font-medium">Select category</div>
              <Select
                size="sm"
                selectionMode="multiple"
                items={listTags}
                onChange={handleSelectCategory}
              >
                {(options) => (
                  <SelectItem key={options.value} value={options.value}>
                    {options.text}
                  </SelectItem>
                )}
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
                {smartcontracts.map((item, index) => (
                  <div className="w-full gap-6 flex flex-row">
                    <div className="flex flex-col gap-2 w-[25%]">
                      <div className="font-medium">Add chain</div>
                      <Select
                        size="sm"
                        name="chain"
                        placeholder="Select chain"
                        items={SELECTiTEMS}
                        onChange={(event) => handleFormChange(index, event)}
                        value={item.chain}
                      >
                        {(options) => (
                          <SelectItem key={options.value} value={options.value}>
                            {options.label}
                          </SelectItem>
                        )}
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2 w-[75%]">
                      <div className="font-medium">Contact address</div>
                      <Input
                        size="sm"
                        type="text"
                        name="contactAddress"
                        placeholder="Contact address"
                        onChange={(event) => handleFormChange(index, event)}
                        value={item.contactAddress}
                      />
                    </div>
                  </div>
                ))}

                <div className="flex justify-between gap-2">
                  <Button
                    color="danger"
                    variant="light"
                    startContent={<IconPlus />}
                    onClick={() =>
                      setSmartContracts((prev) => [
                        ...prev,
                        { chain: undefined, contactAddress: undefined },
                      ])
                    }
                  >
                    Add more contracts
                  </Button>
                  {!!smartcontracts.length && (
                    <Button
                      color="default"
                      variant="light"
                      startContent={<IconDelete />}
                      onClick={() =>
                        setSmartContracts((prev) => [...prev].slice(0, -1))
                      }
                    >
                      Remove Contract
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {!!onFundingSources && (
          <>
            <Divider className="my-4" />
            <div className="w-full h-full flex flex-col sm:flex-row gap-4 justify-between">
              <div className="font-semibold">Funding Sources</div>
              <div className="flex gap-1">
                <div className="font-medium">$2027.23</div>
                <div className="text-[#7B7B7B]">Total Funding</div>
              </div>
            </div>
            <div className="w-full h-full flex flex-col sm:flex-row gap-4 mt-[16px]">
              <div className="w-full sm:w-1/2 gap-4 flex flex-col">
                Add the funding sources that you currently have before
                registering to Potlock (You checked it on the product details)
              </div>
            </div>
            <div>
              <Button onPress={onOpen} color="danger" variant="light">
                <IconAdd />
                <p>Add source</p>
              </Button>
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
            <Button
              isDisabled={
                watch("projectName") && watch("overview") ? false : true
              }
              color="danger"
              onClick={handleSubmit(onSubmit)}
            >
              Create new project
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateProjectTab;
