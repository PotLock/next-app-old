"use client";
import { getProjectDetail } from "@/services";
import HomePage from "@/views/ProjectPage/components/Home";
import { useParams } from "next/navigation";
import React, { ReactElement } from "react";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const { id } = useParams();
  console.log("🚀 ~ Home ~ id:", id)

  const [projectDetail, setProjectDetail] = React.useState<any>();



  const getProjectDetailApi = async() => {
    const res = await getProjectDetail(id);
    console.log("🚀 ~ getProjectDetailApi ~ res:", res?.data)
    
    if(!!res) setProjectDetail(res?.data);
  }

  React.useEffect(() => {
    getProjectDetailApi()
  }, []);
  return (
    <div>
      
      <HomePage  data={projectDetail}/>
    </div>
  );
}
