"use client";
import IconArrowDownFull from "@/assets/icons/IconArrowDownFull";
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import Image from "next/image";
import IconNear from "../../../../../assets/images/IconNear.png";
import React from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  fundingSource: string;
  description: string;
  amount?: number;
  // editKey?: any;
};

interface IAppFunding {
  isOpen: boolean;
  onOpenChange: () => void;
  setData: any;
  data: any;
}

const AddFundingModal = (props: IAppFunding) => {
  const { isOpen, onOpenChange, setData, data } = props;
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (formData: Inputs) => {
    const newData = {
      key: (data.length + 1).toString(),
      fundingSource: formData.fundingSource,
      description: formData.description,
      amount: formData.amount,
    };
    setData((prevData: any) => [...prevData, newData]);
  };

  const handleEdit = (key: string, editedData: Inputs) => {
    setData((prevData: any) =>
      prevData.map((item: any) =>
        item.key === key ? { ...item, ...editedData } : item,
      ),
    );
  };

  return (
    <Modal
      size="2xl"
      className="text-sm"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <form>
            <ModalHeader className="flex flex-col gap-1 text-center">
              <p>$ Add Past Funding Sources</p>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-2">
                <div className="font-medium">Name of investor</div>
                <Input
                  size="sm"
                  type="text"
                  placeholder="Placeholder"
                  {...register("fundingSource")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-medium">Description</div>
                <Textarea
                  labelPlacement="outside"
                  placeholder="Type description"
                  {...register("description")}
                />
                <div className="flex justify-end w-full text-[#7B7B7B]">
                  0/320
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-medium">Amount</div>

                <div className="border rounded-md flex items-center justify-between ">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        className="p-4   flex gap-6 items-center"
                        variant="light"
                      >
                        <div className="flex gap-2 items-center ">
                          <Image src={IconNear} alt="" />
                          <p> NEAR</p>
                        </div>

                        <IconArrowDownFull />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem className="" key="new">
                        NEAR
                      </DropdownItem>
                      <DropdownItem key="copy">USDC</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  {/* <div className="mx-4 text-[#7B7B7B]">25 (Default)</div> */}
                  <Input
                    variant="faded"
                    className="mx-4 text-[#7B7B7B] bg-transparent"
                    {...register("amount")}
                    type="number"
                    placeholder="0.00"
                    labelPlacement="outside"
                    radius="none"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              {/* {watch("editKey") ? (
                  <Button
                    onPress={() => handleEdit(watch("editKey"), watch())}
                    className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                    color="primary"
                  >
                    Edit
                  </Button>
                ) : (
                  <Button isDisabled={watch("fundingSource") && watch("description") ? false : true} color="danger" onPress={onClose} onClick={handleSubmit(onSubmit)}>
                Add
              </Button>
                )} */}
              <Button
                isDisabled={
                  watch("fundingSource") && watch("description") ? false : true
                }
                color="danger"
                onPress={onClose}
                onClick={handleSubmit(onSubmit)}
              >
                Add
              </Button>
              {/* <Button
                    onPress={() => handleEdit(watch("editKey"), watch())}
                    className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                    color="primary"
                  >
                    Edit
                  </Button> */}
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddFundingModal;
