import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React from 'react'

const ModelCart = ({isOpen,
    onOpenChange

}: {isOpen: boolean,
    onOpenChange:() => void
}) => {
  return (
    <Modal 

    className='absolute right-10 top-10'
backdrop="opaque" 
isOpen={isOpen} 
hideCloseButton
onOpenChange={onOpenChange}
classNames={{
  backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
}}
>
<ModalContent>
  {(onClose) => (
    <>
      <ModalHeader className=" bg-white rounded-t-xl border-b">
        <div className='w-full mt-7 flex items-center justify-between'>
        <div className='text-sm'>Donation cart</div>
<div className='flex items-center gap-1'>
<div className='text-sm'>0 </div>
<div className='text-[#7b7b7b] text-sm font-normal'>projects</div>
</div>
        </div>

      </ModalHeader>
      <ModalBody className='bg-white py-7'>
        <div className='text-center'> 
        Get shopping! 💸
        </div>
        
      </ModalBody>
      <ModalFooter className='bg-white flex flex-col w-full rounded-b-xl gap-5'>
        <Button  className='border-none bg-[#e5e5e5] py-4 px-6 rounded-md shadow-[0px_2px_2px]'>
        Proceed to donate
        </Button>
        <Button className='border-none bg-[#dd3344] py-4 px-6 rounded-md shadow-[0px_2px_2px]' >
        Proceed to donate
        </Button>
      </ModalFooter>
    </>
  )}
</ModalContent>
</Modal>
  )
}

export default ModelCart