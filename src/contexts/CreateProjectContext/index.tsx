"use client";
import { TMember } from "@/types";
import { ReactNode, createContext, useMemo, useState } from "react";

export const CreateProjectContext = createContext<any>(null);

export interface ICreateProjectProviderProps {
  children: ReactNode;
}

export default function CreateProjectProvider({
  children,
}: ICreateProjectProviderProps) {
  const [members, setMembers] = useState<TMember[]>([]);
  const [bannerImage, setBannerImage] = useState<File>();
  const [avatarImage, setAvatarImage] = useState<File>();

  const values = useMemo(
    () => ({
      setBannerImage,
      bannerImage,
      setAvatarImage,
      avatarImage,
      members,
      setMembers,
    }),
    [bannerImage, avatarImage, members],
  );

  return (
    <CreateProjectContext.Provider value={values}>
      {children}
    </CreateProjectContext.Provider>
  );
}
