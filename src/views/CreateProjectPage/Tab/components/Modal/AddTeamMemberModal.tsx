"use client";
import { IPFS_BASE_URL } from "@/constant";
import { CreateProjectContext } from "@/contexts/CreateProjectContext";
import useProfileWallet from "@/hooks/useProfileWallet";
import { TMember } from "@/types";
import { getImageUrlFromSocialImage, validateNearAddress } from "@/utils";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  User,
} from "@nextui-org/react";
import React, { useContext, useState } from "react";

const AddTeamMemberModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const [member, setMember] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const { members, setMembers } = useContext(CreateProjectContext);
  const { getProfile } = useProfileWallet();

  const handleAddMember = async () => {
    const isValidWallet = validateNearAddress(member ?? "");
    const isExistAcc = members.some(
      (item: TMember) => item.accountId === member,
    );
    if (!isValidWallet) {
      setIsValid(true);
      return;
    }
    if (!isExistAcc) {
      setIsValid(false);
      let profileMember = {
        accountId: member,
        imageUrl: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      };
      const profileSocial = await getProfile(member ?? "");

      profileMember.imageUrl = getImageUrlFromSocialImage(
        profileSocial[member]?.profile?.image,
      );

      setMembers((prev: TMember[]) => [profileMember, ...prev]);
    }
  };

  const removeMember = (wallet: string) => {
    setMembers((prev: TMember[]) =>
      [...prev].filter((item) => item.accountId !== wallet),
    );
  };

  return (
    <Modal
      size="2xl"
      className="text-sm text-center"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add team members
            </ModalHeader>
            <ModalBody className="flex gap-6">
              <p className="text-[#7B7B7B]">
                Copy, Add the NEAR accounts for your team members.
              </p>
              <div className="flex items-center justify-center">
                <Input
                  radius="none"
                  size="sm"
                  type="text"
                  placeholder="Near ID, comma separated"
                  onChange={(e) => setMember(e.target.value)}
                />
                <Button
                  size="lg"
                  radius="none"
                  color="danger"
                  onClick={handleAddMember}
                  disabled={!member}
                >
                  Add
                </Button>
              </div>
              {isValid && <p>Invalid wallet</p>}
              <div className="flex items-center  gap-1">
                <div className="font-semibold">{members?.length}</div>
                <div className="text-[#7B7B7B]">Member</div>
              </div>
              <Divider />
              <div className="flex flex-col justify-start items-start gap-3">
                {members.map((m: TMember, index: number) => (
                  <>
                    <div className="w-full flex justify-between">
                      <User
                        name={m.accountId}
                        avatarProps={{
                          src: m.imageUrl,
                        }}
                        key={index}
                      />
                      <Button onClick={() => removeMember(m.accountId)}>
                        Remove member
                      </Button>
                    </div>
                    <Divider key={index} />
                  </>
                ))}
              </div>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddTeamMemberModal;
