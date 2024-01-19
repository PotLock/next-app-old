"use client";
import React, { useState } from "react";
import IconCheckYellow from "@/assets/icons/IconCheckYellow";
import { TABS } from "@/constant";

const TagAllProject = ({
  tab,
  handleTag,
}: {
  tab: string;
  handleTag: (label: string) => void;
}) => {
  return (
    <div className="flex w-full flex-col gap-3 items-start justify-start pl-[15px] pr-[15px] mx-0 sm:flex-row sm:p-0 sm:items-center">
      <div>Tags:</div>
      <div className="flex gap-3 flex-wrap ">
        {TABS.map((t) => (
          <div
            key={t.id}
            onClick={() => handleTag(t.label)}
            className={`${
              tab === t.label && "gap-2 bg-[#FEF6EE]"
            } p-2 rounded border text-sm flex items-center  cursor-pointer`}
          >
            {tab === t.label && <IconCheckYellow />}
            {t.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagAllProject;
