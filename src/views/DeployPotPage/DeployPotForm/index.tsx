"use client";
import IconInfo from "@/assets/icons/IconInfo";
import { Wallet } from "@/configs/nearWallet";
import { getApiCommitHash, getWhiteListAccountWallet } from "@/services";
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { utils } from "near-api-js";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { validateNearAddress } from "@/utils";

const DeployPotForm = () => {
  const route = useRouter();
  const [account, setAccount] = useState<any | null>(null);
  const [listAccount, setListAccount] = useState<any | null>(null);
  const [count, setCount] = useState("6");
  const [commitHash, setCommitHash] = useState();
  const [messageAppDate, setMessageAppDate] = useState("");
  const [messageMatchingDate, setMessageMatchingDate] = useState("");
  const [messageDate, setMessageDate] = useState("");
  const [messageChef, setMessageChef] = useState("");

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<any>();
  const getApiWhiteListAccountWallet = async () => {
    try {
      const res = await getWhiteListAccountWallet();
      if (!!res) setListAccount(res?.data);
    } catch (error) {}
  };

  const isCheckAccount = () => {
    if (account && listAccount) {
      const isInArray: boolean = listAccount.includes(account);
      return isInArray;
      // if (!!isInArray) {
      //   return false;
      // } else {
      //   return true;
      // }
    }
  };
  const convertToUTCTimestamp = (localDateTime: any) => {
    if (!localDateTime) {
      return;
    }
    return new Date(localDateTime).getTime();
  };

  const getCommitHash = async () => {
    const res = await getApiCommitHash();
    if (!!res) setCommitHash(res?.data[0].sha);
  };
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    const currentDate = new Date();
    const applicationStartDate = new Date(data.applicationStartDate);
    const applicationEndDate = new Date(data.applicationEndDate);
    const matchingRoundStartDate = new Date(data.matchingRoundStartDate);
    const matchingRoundEndDate = new Date(data.matchingRoundEndDate);

    if (
      applicationStartDate > applicationEndDate ||
      applicationStartDate.getDay() < currentDate.getDay()
    ) {
      setMessageAppDate(
        "The start date must be greater than or equal to the current date and less than the end date",
      );
      return;
    } else {
      setMessageAppDate("");
    }

    if (
      matchingRoundStartDate > matchingRoundEndDate ||
      matchingRoundStartDate.getDay() < currentDate.getDay()
    ) {
      setMessageMatchingDate(
        "The start date must be greater than or equal to the current date and less than the end date",
      );
      return;
    } else {
      setMessageMatchingDate("");
    }

    if (applicationEndDate > matchingRoundEndDate) {
      setMessageDate(
        "Application end date cannot go past matching round end date",
      );
      return;
    } else {
      setMessageDate("");
    }

    if (!validateNearAddress(data?.chef)) {
      setMessageChef("Not near wallet address");
      return;
    } else {
      setMessageChef("");
    }
    const deployArgs = {
      owner: account,
      admins: [], // TODO: CHANGE TO TAKE FROM STATE
      chef: data?.chef,
      pot_name: data?.name,
      pot_description: data?.description,
      max_projects: parseInt(data?.maxProjects),
      application_start_ms: convertToUTCTimestamp(data?.applicationStartDate),
      application_end_ms: convertToUTCTimestamp(data?.applicationEndDate),
      public_round_start_ms: convertToUTCTimestamp(
        data?.matchingRoundStartDate,
      ),
      public_round_end_ms: convertToUTCTimestamp(data?.matchingRoundEndDate),
      registry_provider: process.env.NEXT_PUBLIC_DEFAULT_REGISTRY_PROVIDER,
      sybil_wrapper_provider:
        process.env.NEXT_PUBLIC_DEFAULT_SYBIL_WRAPPER_PROVIDER,
      custom_sybil_checks: null, // not necessary to include null values but doing so for clarity
      custom_min_threshold_score: null,
      referral_fee_matching_pool_basis_points: 0,
      referral_fee_public_round_basis_points: 0,
      chef_fee_basis_points: parseInt(data?.chefFeeBasisPoints),
      protocol_config_provider:
        process.env.NEXT_PUBLIC_DEFAULT_PROTOCOL_CONFIG_PROVIDER, // TODO: this should not be passed in here, as it's too easy to override. Should be set by factory contract when deploying.
      source_metadata: {
        version: process.env.NEXT_PUBLIC_CURRENT_SOURCE_CODE_VERSION,
        commit_hash: commitHash,
        link: process.env.NEXT_PUBLIC_SOURCE_CODE_LINK,
      },
    };

    const wallet = new Wallet({
      createAccessKeyFor:
        process.env.NEXT_PUBLIC_DEFAULT_PROTOCOL_CONFIG_PROVIDER,
      network: "mainnet",
    });
    await wallet.startUp();

    await wallet.callMethod({
      contractId: process.env
        .NEXT_PUBLIC_DEFAULT_PROTOCOL_CONFIG_PROVIDER as string,
      method: "deploy_pot",
      args: {
        pot_args: deployArgs,
      },
      gas: "300000000000000",
      deposit: utils.format.parseNearAmount(count.toString())?.toString(),
    });
  };
  useEffect(() => {
    const wallet = new Wallet({
      createAccessKeyFor:
        process.env.NEXT_PUBLIC_DEFAULT_PROTOCOL_CONFIG_PROVIDER,
      network: "mainnet",
    });

    const startUpWallet = async () => {
      await wallet.startUp();
      const accountId = wallet.accountId;
      if (accountId) {
        setAccount(wallet.accountId);
      }
    };
    startUpWallet();
    getApiWhiteListAccountWallet();
    getCommitHash();
  }, []);

  return (
    <div className="flex flex-col w-full h-full gap-8 px-4 mb-14">
      {/* Pot details */}
      <div className="w-full h-full flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2 gap-4 flex flex-col">
          <div className="font-semibold">Pot details</div>
        </div>
        <div className="w-full sm:w-1/2 gap-2 flex flex-col">
          <div className="flex flex-col gap-2">
            <div className="font-medium">Name</div>
            <Input
              size="sm"
              type="text"
              placeholder="Placeholder"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors?.name && (
              <p className="text-[11px] text-red-500">Name is required.</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-medium">Description</div>
            <Textarea
              labelPlacement="outside"
              placeholder="Type description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors?.description && (
              <p className="text-[11px] text-red-500">
                Description is required.
              </p>
            )}
            <div className="flex justify-end w-full text-[#7B7B7B]">0/320</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-between">
            <div className="flex flex-col gap-2 w-full sm:w-1/2">
              <div className="font-medium flex flex-row gap-2 items-center">
                <p>Referee fee</p>
                <Tooltip content="Coming soon">
                  <div className="cursor-pointer">
                    <IconInfo />
                  </div>
                </Tooltip>
              </div>
              <Input
                size="sm"
                type="number"
                placeholder="% 0"
                {...register("referrerFee")}
              />
            </div>

            <div className="flex flex-col gap-2 w-full sm:w-1/2 ">
              <div className="font-medium flex flex-row gap-2 items-center">
                <p>Protocol fee</p>

                <Tooltip content="Coming soon">
                  <div className="cursor-pointer">
                    <IconInfo />
                  </div>
                </Tooltip>
              </div>
              <div className="flex gap-2 ">
                <Input disabled size="sm" type="text" placeholder="% 2" />
                <IconInfo />

                <p className="text-[11px]">
                  Protocol fee is fixed by the platform
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-between">
            <div className="flex flex-col gap-2  w-full sm:w-1/2">
              <div className="font-medium ">Application start date</div>
              <Input
                size="sm"
                type="date"
                {...register(
                  "applicationStartDate",

                  { required: "Application start date is required" },
                )}
              />
              {errors?.applicationStartDate && (
                <p className="text-[11px] text-red-500">
                  Application start date is required.
                </p>
              )}
              {!!messageAppDate && (
                <p className="text-[11px] text-red-500">{messageAppDate}</p>
              )}
            </div>

            <div className="flex flex-col gap-2  w-full sm:w-1/2">
              <div className="font-medium ">Application end date</div>

              <Input
                size="sm"
                type="date"
                {...register("applicationEndDate", {
                  required: "Application end date is required",
                })}
              />
              {errors?.applicationEndDate && (
                <p className="text-[11px] text-red-500">
                  Application end date is required.
                </p>
              )}
              {!!messageDate && (
                <p className="text-[11px] text-red-500">{messageDate}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-between">
            <div className="flex flex-col gap-2  w-full sm:w-1/2">
              <div className="font-medium ">Matching round start date</div>
              <Input
                size="sm"
                type="date"
                {...register("matchingRoundStartDate", {
                  required: "Matching round start date is required",
                })}
              />
              {errors?.matchingRoundStartDate && (
                <p className="text-[11px] text-red-500">
                  Matching round start date is required.
                </p>
              )}
              {!!messageMatchingDate && (
                <p className="text-[11px] text-red-500">
                  {messageMatchingDate}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2  w-full sm:w-1/2">
              <div className="font-medium ">Matching round end date</div>

              <Input
                size="sm"
                type="date"
                {...register("matchingRoundEndDate", {
                  required: "Matching round end date is required",
                })}
              />
              {errors?.matchingRoundEndDate && (
                <p className="text-[11px] text-red-500">
                  Matching round end date is required.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chef details */}
      <div className="w-full h-full flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2 gap-4 flex flex-col">
          <div className="font-semibold">Chef details</div>
        </div>
        <div className="w-full sm:w-1/2 gap-2 flex flex-col">
          <div className="flex flex-col sm:flex-row gap-6 justify-between">
            <div className="flex flex-col gap-2  w-full sm:w-1/2">
              <div className="font-medium ">Assign chef</div>
              <Input
                size="sm"
                type="text"
                placeholder="Eg defi center"
                {...register("chef")}
              />
              {!!messageChef && (
                <p className="text-[11px] text-red-500">{messageChef}</p>
              )}
            </div>

            <div className="flex flex-col gap-2  w-full sm:w-1/2 ">
              <div className="font-medium flex flex-row gap-2 items-center">
                <p>Chef fee</p>

                <Tooltip content="Coming soon">
                  <div className="cursor-pointer">
                    <IconInfo />
                  </div>
                </Tooltip>
              </div>
              <Input
                size="sm"
                type="number"
                placeholder="% 0"
                {...register("chefFeeBasisPoints")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Application details */}
      <div className="w-full h-full flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2 gap-4 flex flex-col">
          <div className="font-semibold">Application details</div>
        </div>
        <div className="w-full sm:w-1/2 gap-2 flex flex-col">
          <div className="flex flex-col sm:flex-row gap-6 justify-between">
            <div className="flex flex-col gap-2  w-full sm:w-1/2">
              <div className="font-medium ">Max. approved applicants</div>
              <Input
                size="sm"
                type="number"
                placeholder="0"
                {...register("maxProjects")}
              />
            </div>

            <div className="flex flex-col gap-2  w-full sm:w-1/2  ">
              <div className="font-medium flex flex-row gap-2 items-center">
                <p className="font-medium ">Registry Requirement</p>

                <Tooltip content="Coming soon">
                  <div className="cursor-pointer">
                    <IconInfo />
                  </div>
                </Tooltip>
              </div>
              <Input
                size="sm"
                type="text"
                placeholder="Potlock Required"
                {...register("registry")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Donor Requirements */}
      <div className="w-full h-full flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2 gap-4 flex flex-col">
          <div className="font-semibold">Donor Requirements</div>
        </div>
        <div className="w-full sm:w-1/2 gap-2 flex flex-col">
          <Controller
            name="radioGroup"
            control={control}
            defaultValue="nadaBot"
            // rules={{ required: "Please select an option" }}
            render={({ field }) => (
              <RadioGroup {...field} orientation="horizontal">
                <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
                  <div className="border rounded-md py-[10px] px-4  w-full sm:w-1/2">
                    <Radio value="nadaBot">🤖 nada.bot human verified</Radio>
                  </div>
                  <div className="border rounded-md py-[10px] px-4  w-full sm:w-1/2">
                    <Radio value="advanced">Advanced option</Radio>
                  </div>
                </div>
              </RadioGroup>
            )}
          />
        </div>
      </div>

      {/* Button deploy */}
      <div className="flex w-full justify-end gap-6">
        <Button onClick={() => route.push("/pots")}>Cancel</Button>
        {!isCheckAccount() ? (
          <Tooltip content="Your account does not have permissions">
            <Button disabled={true} color="danger">
              Deploy
            </Button>
          </Tooltip>
        ) : (
          <Button onClick={handleSubmit(onSubmit)} color="danger">
            Deploy
          </Button>
        )}
      </div>
    </div>
  );
};

export default DeployPotForm;
