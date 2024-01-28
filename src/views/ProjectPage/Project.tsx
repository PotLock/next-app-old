"use client";
import { DATA_SOCIALS } from "@/constant/socials";
import { ProjectDetail } from "@/contexts";
import { Image, useDisclosure } from "@nextui-org/react";
import { ReactNode, useContext, useEffect, useState } from "react";
import IndividualPage from "./components/Individual";
import NavbarPage from "./components/Navbar";
import DonateProjectModal from "@/components/Modal/DonateProjectModal";

export interface IProjectPageProps {
  children?: ReactNode;
}

export default function ProjectPage(props: IProjectPageProps) {
  const { children } = props;
  const { data } = useContext(ProjectDetail);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [imageUrl, setImageUrl] = useState("");
  const [logo, setLogo] = useState("");

  useEffect(() => {
    if (data?.bannerImageUrl) {
      setImageUrl(`https://nftstorage.link/ipfs/${data?.bannerImageUrl}`);
    }
    if (data?.profileImageUrl) {
      setLogo(`https://nftstorage.link/ipfs/${data?.profileImageUrl}`);
    }
  }, [data]);

  const newData = DATA_SOCIALS.map((item) => ({
    ...item,
    link: data?.linktree[item.url] ? data?.linktree[item.url] : undefined,
  }));

  return (
    <div className="mx-[32px]">
      <DonateProjectModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
      <div className="w-full relative">
        <div className="w-full relative">
          {!!data?.bannerImageUrl ? (
            <Image
              radius="none"
              alt="Card background"
              className="object-cover	 h-[280px] w-[1440px]"
              src={imageUrl}
              onError={() => setImageUrl("/ProjectImage.png")}
            />
          ) : (
            <Image
              radius="none"
              alt="Card background"
              className="object-cover	 h-[280px] w-[1440px]"
              src="/ProjectImage.png"
            />
          )}
          <div className="absolute top-[240px]">
            {!!data?.profileImageUrl ? (
              <Image
                alt="Card icon"
                className="ml-6 rounded-full border-2 border-white object-cover w-[80px] h-[80px]"
                src={logo}
                onError={() => setLogo("/ProjectLogo.png")}
              />
            ) : (
              <Image
                alt="Card icon"
                className="ml-6 rounded-full border-2 border-white object-cover w-[80px] h-[80px]"
                src="/ProjectLogo.png"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex pt-[48px]">
        <div className="w-[20%] p-[24px]">
          <NavbarPage />
        </div>
        <div className="w-[80%] mx-[36px]">
          <IndividualPage openModal={onOpen} />
        </div>
      </div>
      <div className=" w-full flex border-t-2 ">
        <div className="w-[20%] border-r-2 p-[24px]">
          <div className="text-[14px] font-semibold">Social</div>
          {newData?.map(
            (item, index) =>
              !!item.link && (
                <a key={index} href={item.link} target="_blank">
                  <div key={index} className="flex gap-[8px] py-[16px]">
                    {item?.icons}
                    <div className="text-[14px] font-normal">{item.name}</div>
                  </div>
                </a>
              ),
          )}
        </div>
        <div className="w-[80%] m-[36px]">{children}</div>
      </div>
    </div>
  );
}
