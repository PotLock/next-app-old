"use client";
import { IconDelete, IconPlus, IconEdit } from "@/assets/icons";
import IconAdd from "@/assets/icons/IconAdd";
import { URLINFOR } from "@/constant";
import { CreateProjectContext } from "@/contexts/CreateProjectContext";
import useTags from "@/hooks/useTags";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import AddFundingModal from "../Modal/AddFundingModal";
import { Transaction, Wallet } from "@/configs/nearWallet";
import SmartContractForm from "./SmartContractForm";

type Inputs = {
  projectName: string;
  projectId?: string;
  overview: string;
  contractAddress: string;
  twitter: string;
  telegram: string;
  github: string;
  website: string;
  DAOAddress: string;
  fileBanner: File;
  fileAvatar: File;
};
type TSmartContract = { chain?: string; contactAddress?: string };

const rows = [
  {
    key: "1",
    fundingSource: "Web3 Open Source Software",
    description: (
      <div className="overflow-ellipsis line-clamp-1">
        Lorem ipsum dolor sit amet consectetur. Vel sit nunc in nunc. Viverra
        arcu eu sed consequat.
      </div>
    ),
    amount: "$ 30",
    action: (
      <div className="flex gap-[20px]">
        <IconEdit /> <IconDelete />
      </div>
    ),
  },
];

// TODO: Need handle that project should create or update
const CreateProjectTab = () => {
  const [onSmartContract, setOnSmartContract] = useState(false);
  const [onFundingSources, setOnFundingSources] = useState(false);
  const [onDao, setOnDao] = useState(false);
  const [data, setData] = useState(rows);
  const [selectCategory, setSelecteCategory] = useState(new Set());
  const [smartcontracts, setSmartContracts] = useState<TSmartContract[]>([
    { chain: undefined, contactAddress: undefined },
  ]);

  const { bannerImage, avatarImage, members } =
    useContext(CreateProjectContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const listTags = useTags();
  const [accountId, setAccountId] = useState<string>("");

  useEffect(() => {
    const getAccountId = async () => {
      const wallet = new Wallet({
        createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_ID,
        network: "mainnet",
      });
      await wallet.startUp();
      const accountId = wallet.accountId;
      if (accountId) setAccountId(accountId);
    };

    getAccountId();
  }, []);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    data.twitter = data.twitter ? `twitter.com/${data.twitter}` : "";
    data.telegram = data.telegram ? `t.me/${data.telegram}` : "";
    data.github = data.github ? `github.com/${data.github}` : "";
    data.website = data.website ? `https://${data.website}` : "";
    data.category = [...selectCategory];
    data.backgroundImage = bannerImage;
    data.profileImage = avatarImage;
    data.members = members;
    if (smartcontracts.some((item) => item.chain && item.contactAddress)) {
      data.smartcontract = smartcontracts.filter((item) => item.chain);
    }

    const socialArgs = {
      data: {
        [accountId]: {
          profile: {
            name: data.projectName,
            category: data.category,
            description: data.overview,
            linktree: {
              website: data.website,
              twitter: data.twitter,
              telegram: data.telegram,
              github: data.github,
            },
            team: data.members.reduce(
              (acc: any, tm: any) => ({
                ...acc,
                [tm.accountId]: tm.remove ? null : "",
              }),
              {},
            ),
            backgroundImage: {
              ipfs_cid: "cid from ipfs",
            },
            image: {
              ipfs_cid: "cid from ipfs",
            },
          },
          index: {
            star: {
              key: {
                type: "social",
                path: "potlock.near/widget/Index",
              },
              value: {
                type: "star",
              },
            },
            notify: {
              key: "potlock.near",
              value: {
                type: "star",
                item: {
                  type: "social",
                  path: "potlock.near/widget/Index",
                },
              },
            },
          },
          graph: {
            star: {
              "potlock.near": {
                widget: {
                  Index: "",
                },
              },
            },
            follow: {
              "potlock.near": "",
            },
          },
        },
      },
    };

    const wallet = new Wallet({
      createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_ID,
      network: "mainnet",
    });

    await wallet.startUp();
    const socialTransaction: Transaction = {
      receiverId: "social.near",
      functionCalls: [
        {
          methodName: "set",
          args: socialArgs,
          // amount: utils.format
          //   .parseNearAmount(
          //     (JSON.stringify(socialArgs).length * 0.00003).toString(),
          //   )
          //   ?.toString(),
          amount: (JSON.stringify(socialArgs).length * 0.00003).toString(),
        },
      ],
    };

    const registerTransaction: Transaction = {
      receiverId: process.env.NEXT_PUBLIC_REGISTRY_ID as string,
      functionCalls: [
        {
          methodName: "register",
          args: {},
        },
      ],
    };

    const addProjectTransaction: Transaction = {
      receiverId: "nearhorizon.near",
      functionCalls: [
        {
          methodName: "add_project",
          args: { account_id: wallet.accountId },
        },
      ],
    };

    await wallet.callMultiMethod([
      socialTransaction,
      registerTransaction,
      addProjectTransaction,
    ]);
    // await wallet.callMethod({
    //   contractId: "social.near",
    //   method: "set",
    //   args: socialArgs,
    //   deposit: utils.format
    //     .parseNearAmount(
    //       (JSON.stringify(socialArgs).length * 0.00003).toString(),
    //     )
    //     ?.toString(),
    // });

    // await wallet.callMethod({
    //   contractId: process.env.NEXT_PUBLIC_REGISTRY_ID as string,
    //   method: "register",
    //   args: {},
    // });

    // await wallet.callMethod({
    //   contractId: "nearhorizon.near",
    //   method: "add_project",
    //   args: {
    //     account_id: wallet.accountId,
    //   },
    // });

    // await wallet.wallet?.signAndSendTransactions()
  };

  const handleSelectCategory = (e: any) => {
    setSelecteCategory(new Set([e.target.value]));
  };

  const onSmartContractChange = (index: number, event: any) => {
    let data: TSmartContract[] = [...smartcontracts];
    data[index][event.target.name as keyof TSmartContract] = event.target.value;
    setSmartContracts(data);
  };

  const handleDelete = (key: string) => {
    setData((prevData) => prevData?.filter((item) => item.key !== key));
  };

  const handleEdit = () => {
    console.log("asaa");
  };

  return (
    <form>
      <div className="flex flex-col w-full h-full">
        <AddFundingModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          setData={setData}
          data={data}
        />
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
                <Input size="sm" type="text" value={accountId} disabled />
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
          <SmartContractForm
            smartcontracts={smartcontracts}
            setSmartContracts={setSmartContracts}
            onSmartContractChange={onSmartContractChange}
          />
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
            <div className="my-[12px]">
              <Table>
                <TableHeader>
                  <TableColumn key="fundingSource">Funding Source</TableColumn>
                  <TableColumn key="description" width={350}>
                    Description
                  </TableColumn>
                  <TableColumn key="amount" allowsSorting={true}>
                    Amount
                  </TableColumn>
                  <TableColumn key="action">
                    <div></div>
                  </TableColumn>
                </TableHeader>
                <TableBody items={data}>
                  {(item) => (
                    <TableRow key={item.key}>
                      {(columnKey) => (
                        <TableCell>
                          {columnKey === "action" ? (
                            <div className="flex gap-[20px] cursor-pointer">
                              <div onClick={onOpen}>
                                <IconEdit />
                              </div>
                              <div onClick={() => handleDelete(item.key)}>
                                <IconDelete />
                              </div>
                            </div>
                          ) : (
                            getKeyValue(item, columnKey)
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
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
