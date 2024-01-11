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
} from "@nextui-org/react";
import React from "react";

const ProjectCard = ({
  title,
  content,
  onOpen,
}: {
  title?: string;
  content?: string;
  onOpen?: () => void;
}) => {
  return (
    <Card className=" w-[360px] sm:w-[408px] flex-col flex border border-[#292929] ">
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
          className="ml-6 absolute -bottom-5 rounded-full border-2 border-white"
          src="/ProjectLogo.png"
          width={40}
          height={40}
        />
      </div>
      <CardBody className="p-6 flex gap-[6px] flex-col">
        <div className="font-semibold text-[17px]">{title || "RevitFi"}</div>
        <div className="text-[17px]">
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
      <CardFooter className="flex justify-between py-4 px-6 border-t border-[#292929] items-center">
        <div className="flex gap-2">
          <div className="font-semibold text-[17px]">$24.00</div>
          <div>Raised</div>
        </div>

        <Button variant="bordered" onPress={onOpen}>
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
