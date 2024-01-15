import {
  Card,
  CardBody,
  Image,
  CardFooter,
  Button,
  Divider,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

const ProjectCard = ({ data, onOpen }: { data: any; onOpen: () => void }) => {
  const openModal = () => {
    localStorage.setItem("receipientId", data?.project_id);
    onOpen();
  };

const ProjectCard = ({ data, onOpen }: { data: any; onOpen?: () => void }) => {

  const router = useRouter();
  return (
    <div
    onClick={() => router.push(`/project/${data?.id}`)}
    >
 <Card 
   
    className=" w-[360px] sm:w-[408px] cursor-pointer ">
      <div className="w-full relative">
        {data?.bannerImageUrl !== "" ? (
          <Image
            radius="none"
            alt="Card background"
            className="object-fill h-[150px] w-[360px] sm:w-[408px] "
            src={`https://nftstorage.link/ipfs/${data?.bannerImageUrl}`}
            
          />
        ) : (
          <Image
            radius="none"
            alt="Card background"
            className="object-fill h-[150px] w-[360px] sm:w-[408px] "
            src="/ProjectImage.png"
          />
        )}

        {data?.profileImageUrl !== "" ? (
          <Image
            alt="Card icon"
            className="ml-6 absolute -bottom-5 rounded-full border-2 border-white object-cover w-[60px] h-[60px]"
            src={`https://nftstorage.link/ipfs/${data?.profileImageUrl}`}
           width={60}
           height={60}
          />
        ) : (
          <Image
            alt="Card icon"
            className="ml-6 absolute -bottom-5 rounded-full border-2 border-white object-cover w-[60px] h-[60px]"
            src="/ProjectLogo.png"
            width={60}
           height={60}
          />
        )}
      </div>
      <CardBody className="p-6 flex gap-[6px] flex-col">
        <div className="font-semibold">{data?.name || "RevitFi"}</div>
        <div className=" h-[60px] ">
          <p className="line-clamp-2 overflow-ellipsis">
            {data?.description ||
              "Redefining DeFi on NEAR with a cross-chain interoperable layer1 infrastructure."}
          </p>
        </div>
        <div className="flex gap-2">
          {data?.tags?.map((tag: any, index: any) => (
            <div
              key={index}
              className="p-2 border rounded shadow-[0px_1px_1px]"
            >
              {tag || "Tag"}
            </div>
          ))}
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-between py-4 px-6 items-center">
        <div className="flex gap-2">
          <div className="font-semibold ">$24.00</div>
          <div>Raised</div>
        </div>

        <Button onPress={openModal}>Donate</Button>
      </CardFooter>
    </Card>
    </div>
   
  );
}
}

export default ProjectCard
