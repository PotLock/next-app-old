"use client";

import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import React from "react";

import CreateProjectTab from "./components/CreateProjectTab";

const TabsCreateProject = () => {
  return (
    <div className="px-[186px] w-full text-sm">
      <Tabs aria-label="Options">
        <Tab key="create-project" title="Create Project">
          <CreateProjectTab />
        </Tab>
        <Tab key="create-proposal" title="Create Proposal">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabsCreateProject;
