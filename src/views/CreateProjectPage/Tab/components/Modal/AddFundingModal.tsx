'use client'
import IconArrowDownFull from '@/assets/icons/IconArrowDownFull';
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@nextui-org/react';
import Image from 'next/image';
import IconNear from "../../../../../assets/images/IconNear.png"
import React from 'react'

const AddFundingModal = (
    {
        isOpen,
        onOpenChange,
       
      }: {
        isOpen: boolean;
        onOpenChange: () => void;
       
      
      }
) => {
  return (
    <Modal 
    size='2xl'
    className='text-sm'
    isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                <p>$ Add Past Funding Sources</p>
              </ModalHeader>
              <ModalBody>
              <div className="flex flex-col gap-2">
                  <div className="font-medium">Name  of investor</div>
                  <Input size="sm" type="text" placeholder="Placeholder" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-medium">Description</div>
                  <Textarea
                  
                    labelPlacement="outside"
                    placeholder="Type description"
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
                
                <Button color="danger" onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  )
}

export default AddFundingModal