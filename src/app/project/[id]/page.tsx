"use client";
import { ProjectDetail } from "@/contexts";
import { getProjectDetail } from "@/services";
import ProjectPage from "@/views/ProjectPage/Project";
import HomePage from "@/views/ProjectPage/components/Home";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = React.useState<any>();

  useEffect(() => {
    const getProjectDetailApi = async () => {
      const res = await getProjectDetail(id);
      if (!!res) setProjectDetail(res?.data);
    };

    getProjectDetailApi();
  }, [id]);

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
