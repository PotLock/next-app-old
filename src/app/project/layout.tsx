"use client";
import { ProjectDetail } from "@/contexts";
import { getProjectDetail } from "@/services";
import ProjectPage from "@/views/ProjectPage/Project";
import { useParams } from "next/navigation";
import React, { useEffect, ReactElement, createContext } from "react";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = React.useState<any>();

  const getProjectDetailApi = async () => {
    const res = await getProjectDetail(id);
    if (!!res) setProjectDetail(res?.data);
  };

  useEffect(() => {
    getProjectDetailApi();
  }, []);

  return (
    <ProjectDetail.Provider value={{ data: projectDetail }}>
      <ProjectPage>{children}</ProjectPage>
    </ProjectDetail.Provider>
  );
}
