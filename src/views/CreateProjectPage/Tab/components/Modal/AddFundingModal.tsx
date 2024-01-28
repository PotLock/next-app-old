'use client'
import IconArrowDownFull from '@/assets/icons/IconArrowDownFull';
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@nextui-org/react';
import Image from 'next/image';
import IconNear from "../../../../../assets/images/IconNear.png"
import React from 'react'
import { useForm } from "react-hook-form";

type Inputs = {
  fundingSource: string,
  description: string,
  amount?: number
}

interface IAppFunding {
  isOpen: boolean;
  onOpenChange: () => void;
  setData: any;
  data: any
}

const AddFundingModal = (props : IAppFunding) => {

  const { isOpen, onOpenChange, setData, data } = props
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
    setData((prevData : any) => [...prevData, newData]);
    console.log("👋  data:", formData);
  }

return (
  <Modal
    size='2xl'
    className='text-sm'
    isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
      {(onClose) => (
        <form>
          <ModalHeader className="flex flex-col gap-1 text-center">
            <p>$ Add Past Funding Sources</p>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <div className="font-medium">Name  of investor</div>
              <Input size="sm" type="text" placeholder="Placeholder" {...register("fundingSource")} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-medium">Description</div>
              <Textarea
                labelPlacement="outside"
                placeholder="Type description"
                {...register("description")}
              />
              <div className='flex justify-end w-full text-[#7B7B7B]'>
                0/320
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div className="font-medium">Amount</div>

              <div className="border rounded-md flex items-center justify-between ">
                <Dropdown>
                  <DropdownTrigger >
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

                <div className="mx-4 text-[#7B7B7B]">25 (Default)</div>
              </div>
            </div>

          </ModalBody>
          <ModalFooter>

            <Button isDisabled={watch("fundingSource") && watch("description") ? false : true} color="danger" onPress={onClose} onClick={handleSubmit(onSubmit)}>
              Add
            </Button>
          </ModalFooter>
        </form>
      )}
    </ModalContent>
  </Modal>
)
}

export default AddFundingModal