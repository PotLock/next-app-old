import CreateProjectProvider from "@/contexts/CreateProjectContext";
import BannerCreateProject from "@/views/CreateProjectPage/Banner/BannerCreateProject";
import BannerMember from "@/views/CreateProjectPage/Banner/BannerMember";
import TabsCreateProject from "@/views/CreateProjectPage/Tab";

import React, { useState } from "react";

const CreateProject = () => {
  return (
    <div className="w-full h-full">
      <CreateProjectProvider>
        <BannerCreateProject />
        <BannerMember />
        <TabsCreateProject />
      </CreateProjectProvider>
    </div>
  );
};

export default CreateProject;
