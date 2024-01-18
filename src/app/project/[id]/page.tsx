"use client";
import { ProjectDetail } from "@/contexts";
import { getProjectDetail } from "@/services";
import ProjectPage from "@/views/ProjectPage/Project";
import HomePage from "@/views/ProjectPage/components/Home";
import { useParams } from "next/navigation";
import React, { ReactElement, createContext } from "react";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = React.useState<any>();

  const getProjectDetailApi = async () => {
    const res = await getProjectDetail(id);
    if (!!res) setProjectDetail(res?.data);
  };

  React.useEffect(() => {
    getProjectDetailApi();
  }, []);

  return (
    <div>
      <ProjectDetail.Provider value={{ data: projectDetail }}>
        <ProjectPage>
          <HomePage />
        </ProjectPage>
      </ProjectDetail.Provider>
    </div>
  );
}
