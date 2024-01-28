import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import React from "react";

const PotCard = ({data}: any) => {
  const convertToPositive = (inputNumber: any) => {
    const parsedNumber = parseFloat(inputNumber);

    if (!isNaN(parsedNumber)) {
      const positiveNumber = Math.abs(parsedNumber);
      return positiveNumber
    } else {
      return null
    }
  };
  return (
    <Card className="max-w-[400px] m-1 " 
    
    radius="none">
      <CardHeader >
        <p className="text-lg font-semibold  truncate">
        {data?.title || 'GameNetWeb3 Grant: Forging the Future of Web3 Gaming'}
        </p>
      </CardHeader>

      <CardBody>
        <div className=" text-small line-clamp-3 overflow-ellipsis h-[60px]">
         {data?.description || 'Welcome to the GameNetWeb3 Grant project, where we&apos;re paving the way for the future of gaming by weaving together Web3 technology and innovative networking. Our vision is to establish a dynamic network that fosters collaboration, connectivity, and growth among Web3 game developers, enthusiasts, and players.'} 
        </div>
      </CardBody>
      <Divider />

      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex flex-row gap-2 justify-between w-full items-center">
          <p className="font-semibold">{data?.totalAmount || '1,369.69 NEAR'} </p>
          <p className="text-[#7B7B7B]">{data?.totalMatchingPool } Matched</p>
        </div>
        <div className={`${data?.timeTags?.matchingRoundDayEnd  > data?.timeTags?.applicationDayEnd ? 'bg-[#9ADD33] ' : 'bg-[#33DDCB]'} border py-[6px] px-2 rounded`}>
          {data?.timeTags?.matchingRoundDayEnd  > data?.timeTags?.applicationDayEnd ? convertToPositive(data?.timeTags?.matchingRoundDayEnd) + ' day left for Matching'   : convertToPositive(data?.timeTags?.applicationDayEnd) + ' day left to Apply' } 
        </div>
      </CardFooter>
    </Card>
  );
};

export default PotCard;
