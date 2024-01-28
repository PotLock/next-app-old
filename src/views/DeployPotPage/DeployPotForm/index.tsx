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

const DeployPotForm = () => {
  const route = useRouter();
  const [account, setAccount] = useState<any | null>(null);
  const [listAccount, setListAccount] = useState<any | null>(null);
  const [count, setCount] = useState("0.6");
  const [commitHash, setCommitHash] = useState();

  const {
    register,
    control,
    handleSubmit,
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
    
      if (!!isInArray) {
        return false;
      } else {
        return true;
      }
    }
  };
  const convertToUTCTimestamp = (localDateTime: any) => {
    if (!localDateTime) {
      return;
    }
    return new Date(localDateTime).getTime();
  };

  const getCommitHash = async() => {
    const res = await getApiCommitHash();
    if(!!res) setCommitHash(res?.data[0].sha)

  }
  const onSubmit: SubmitHandler<any> = async (data: any) => {

    const deployArgs = {
    owner: account,
    admins: [], // TODO: CHANGE TO TAKE FROM STATE
    chef: data?.chef,
    pot_name: data?.name,
    pot_description: data?.description,
    max_projects: parseInt(data?.maxProjects),
    application_start_ms: convertToUTCTimestamp(data?.applicationStartDate),
    application_end_ms: convertToUTCTimestamp(data?.applicationEndDate),
    public_round_start_ms: convertToUTCTimestamp(data?.matchingRoundStartDate),
    public_round_end_ms: convertToUTCTimestamp(data?.matchingRoundEndDate),
    registry_provider: process.env.NEXT_PUBLIC_DEFAULT_REGISTRY_PROVIDER,
    sybil_wrapper_provider: process.env.NEXT_PUBLIC_DEFAULT_SYBIL_WRAPPER_PROVIDER,
    custom_sybil_checks: null, // not necessary to include null values but doing so for clarity
    custom_min_threshold_score: null,
    referral_fee_matching_pool_basis_points: 0,
    referral_fee_public_round_basis_points: 0,
    chef_fee_basis_points: parseInt(data?.chefFeeBasisPoints),
    protocol_config_provider: process.env.NEXT_PUBLIC_DEFAULT_PROTOCOL_CONFIG_PROVIDER, // TODO: this should not be passed in here, as it's too easy to override. Should be set by factory contract when deploying.
    source_metadata: {
      version: process.env.NEXT_PUBLIC_CURRENT_SOURCE_CODE_VERSION,
      commit_hash: commitHash,
      link:  process.env.NEXT_PUBLIC_SOURCE_CODE_LINK,
    },
  };
   
    const wallet = new Wallet({
      createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_ID,
      network: "mainnet",
    });
    await wallet.startUp();
    
      await wallet.callMethod({
        contractId: process.env.NEXT_PUBLIC_DEFAULT_PROTOCOL_CONFIG_PROVIDER as string,
        method: "deploy_pot",
        args: {
          pot_args: deployArgs,
        },
        deposit: utils.format.parseNearAmount(count.toString())?.toString(),
      });
    
  };
  useEffect(() => {
    const wallet = new Wallet({
      createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_ID,
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
          <div className="font-semibold">Pot details {account}</div>
        </div>
        <div className="w-full sm:w-1/2 gap-2 flex flex-col">
          <div className="flex flex-col gap-2">
            <div className="font-medium">Name</div>
            <Input
              size="sm"
              type="text"
              placeholder="Placeholder"
              {...register("name")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-medium">Description</div>
            <Textarea
              labelPlacement="outside"
              placeholder="Type description"
              {...register("description")}
            />
            <div className="flex justify-end w-full text-[#7B7B7B]">0/320</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-between">
            <div className="flex flex-col gap-2 w-full sm:w-1/2">
              <div className="font-medium flex flex-row gap-2 items-center">
                <p>Referee fee</p>

                <IconInfo />
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

                <IconInfo />
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
              <Input size="sm" type="date" {...register("applicationStartDate")} />
            </div>

            <div className="flex flex-col gap-2  w-full sm:w-1/2">
              <div className="font-medium ">Application end date</div>

              <Input size="sm" type="date" {...register("applicationEndDate")} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-between">
            <div className="flex flex-col gap-2  w-full sm:w-1/2">
              <div className="font-medium ">Matching round start date</div>
              <Input size="sm" type="date" {...register("matchingRoundStartDate")} />
            </div>

            <div className="flex flex-col gap-2  w-full sm:w-1/2">
              <div className="font-medium ">Matching round end date</div>

              <Input size="sm" type="date" {...register("matchingRoundEndDate")} />
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
            </div>

            <div className="flex flex-col gap-2  w-full sm:w-1/2 ">
              <div className="font-medium flex flex-row gap-2 items-center">
                <p>Chef fee</p>

                <IconInfo />
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

                <IconInfo />
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
            defaultValue=""
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
        <Button
        onClick={() => route.push('/pots')}
        >Cancel</Button>

        <Button
          disabled={isCheckAccount()}
          onClick={handleSubmit(onSubmit)}
         
          color="danger"
        >
          Deploy
        </Button>
      </div>
    </div>
  );
};

export default DeployPotForm;
