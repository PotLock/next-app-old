"use client";
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
import React from "react";

const AddTeamMemberModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
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
                />
                <Button size="lg" radius="none" color="danger">
                  Add
                </Button>
              </div>
              <div className="flex items-center  gap-1">
                <div className="font-semibold">4</div>
                <div className="text-[#7B7B7B]">Member</div>
              </div>
              <Divider />
              <div className="flex flex-col justify-start items-start gap-3">
                <User
                  name="@JaneDoe"
                  avatarProps={{
                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                  }}
                />
              <Divider />

                <User
                  name="@JaneDoe"
                  avatarProps={{
                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                  }}
                />
              <Divider />

                <User
                  name="@JaneDoe"
                  avatarProps={{
                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                  }}
                />
              <Divider />

                <User
                  name="@JaneDoe"
                  avatarProps={{
                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                  }}
                />
              </div>
            </ModalBody>
            <ModalFooter>
             
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddTeamMemberModal;
