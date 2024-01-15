// import Image from 'next/image'
import ProjectImg from "../../assets/images/ProjectImage.png";
import ProjectLogo from "../../assets/images/ProjectLogo.png";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Button,
  Divider,
} from "@nextui-org/react";
import React from "react";
import { Wallet } from "@/configs/nearWallet";

const ProjectCard = ({
  title,
  content,
  onOpen,
}: {
  title?: string;
  content?: string;
  onOpen?: () => void;
}) => {
  const temp = async () => {
    const wallet = new Wallet({
      createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_ID,
      network: "mainnet",
    });
    await wallet.startUp();
    await wallet.callMethod({
      contractId: process.env.NEXT_PUBLIC_DONATION_ID as string,
      method: "donate",
      args: {
        recipient_id: "magicbuild.near",
      },
    });
  };

  return (
    <Card className=" w-[360px] sm:w-[408px] ">
      <div className="w-full relative">
        <Image
          radius="none"
          alt="Card background"
          className="object-cover "
          src="/ProjectImage.png"
          height={150}
        />
        <Image
          alt="Card icon"
          className="ml-6 absolute -bottom-5 rounded-full border-2 border-white object-cover"
          src="/ProjectLogo.png"
          width={60}
          height={60}
        />
      </div>
      <CardBody className="p-6 flex gap-[6px] flex-col">
        <div className="font-semibold">{title || "RevitFi"}</div>
        <div>
          {content ||
            "Redefining DeFi on NEAR with a cross-chain interoperable layer1 infrastructure."}
        </div>
        <div className="flex gap-2">
          <div className="p-2 border rounded shadow-[0px_1px_1px]">Defi</div>
          <div className="p-2 border rounded shadow-[0px_1px_1px]">
            Open source
          </div>
          <div className="p-2 border rounded shadow-[0px_1px_1px]">
            Non profit
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-between py-4 px-6 items-center">
        <div className="flex gap-2">
          <div className="font-semibold ">$24.00</div>
          <div>Raised</div>
        </div>

        <Button onPress={onOpen} onClick={temp}>
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
