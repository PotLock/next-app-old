import { Card, CardBody, CardFooter, CardHeader, Divider } from '@nextui-org/react'
import React from 'react'

const PotCard = () => {
  return (
    <Card className="max-w-[400px]">
    <CardHeader className="flex gap-3">
   
      <div className="flex flex-col">
        <p className="text-md">GameNetWeb3 Grant: Forging the Future of Web3 Gaming</p>
        <p className="text-small text-default-500">Welcome to the GameNetWeb3 Grant project, where we&apos;re paving the way for the future of gaming by weaving together Web3 technology and innovative networking. Our vision is to establish a dynamic network that fosters collaboration, connectivity, and growth among Web3 game developers, enthusiasts, and players.</p>
      </div>
    </CardHeader>
    <Divider/>
    <CardBody className='flex flex-row gap-2'>
      <p>1,369.69 NEAR </p>
      <p className='text-[#7B7B7B]'>~$20,123.12 Matched</p>
    </CardBody>

    <CardFooter>
     <div className='border bg-[#9ADD33] py-[6px] px-2 rounded'>1 day left for Matching</div>
    </CardFooter>
  </Card>
  )
}

export default PotCard