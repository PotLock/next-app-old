"use client";

import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import React from "react";

import CreateProjectTab from "./components/CreateProjectTab";

const TabsCreateProject = () => {
  return (
    <div className="px-4 sm:px-[186px] w-full text-sm mb-14">
      <CreateProjectTab />
    </div>
  );
};

export default TabsCreateProject;
