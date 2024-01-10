import IconSuccessful from '@/assets/icons/IconSuccessful';
import IconNear from "../../../assets/images/IconNear.png";
import IconWeb3 from "../../../assets/images/IconWeb3.png";

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import React from 'react'
import Image from 'next/image';
import IconArrowDown from '@/assets/icons/IconArrowDown';
import IconShare from '@/assets/icons/IconShare';
import IconCopy from '@/assets/icons/IconCopy';

const DonationRandomlyModelFinal = (
  {
    isOpen,
    onOpenChange,
  }: {
    isOpen: boolean;
    onOpenChange: () => void;
  }
) => {
  // const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>

      <Modal 
      className='bg-white rounded-md border border-[#FAFAFA]'
      size='2xl'
      isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col  text-center text-[17px]">Donate Randomly</ModalHeader>
              <ModalBody className='flex items-center justify-center py-20 gap-6'>
                <IconSuccessful/>
                <div className="flex gap-2 items-center">
                <p className=' text-4xl'> 100</p>

                          <Image src={IconNear} alt="" />
                        </div>
                <div>
                350.55 USDC
                </div>
                <div className='flex items-center font-semibold gap-2'>
                  <div>
                  Has been donated to
                  </div>
                  <div className='py-1 px-2 bg-[#F0F0F0] rounded-full flex gap-1 items-center'>
                    <Image src={IconWeb3} alt=''/>
                    Web3 Open Source Software</div>
                </div>
                <div className="flex items-end justify-end">
                  <button  className="flex gap-2">
                    <p className="font-medium">Show breakdown</p>
                    <IconArrowDown />
                  </button>
                </div>
                <div className='bg-[#FAFAFA] py-3 px-9'>
                  <div className='flex gap-2 items-center '>
                    <div>From</div>
                    <div className='py-1 px-2 bg-[#F0F0F0] rounded-full flex gap-1 items-center'>lorem.ipsum.near</div>
                  </div>
                  <div className='text-[#7B7B7B]'>Txn Hash : ipfs://9jjdfhghhjjhjhj</div>
                  <div className='flex items-center justify-center gap-2 text-[#DD3345]' >
                    <button className='py-3 px-4 flex items-center gap-2'>
                      <IconShare/>
                      <p>Share</p>
                    </button>
                    <button className='py-3 px-4 flex items-center gap-2'>
                      <IconCopy/>
                      <p>Copy Hash</p>
                    </button>
                  </div>
                </div>
                
              </ModalBody>
              <ModalFooter
              className='flex items-center justify-center gap-4'
              >
                <Button 
                className='bg-[#FEF6EE] border border-black rounded-md shadow-[0px_2px_2px] py-3 px-4'
                >
                  Do it again
                </Button>
                <Button 
                className='bg-[#FEF6EE] border border-black rounded-md shadow-[0px_2px_2px] py-3 px-4'
                >
                  Explore projects
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default DonationRandomlyModelFinal