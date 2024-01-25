"use client";
import IconCheckYellow from "@/assets/icons/IconCheckYellow";
import useTags from "@/hooks/useTags";
import { getListTagRequest } from "@/services";
import { TTag } from "@/types";
import { useEffect, useState } from "react";

const TagAllProject = ({
  tags,
  handleTag,
}: {
  tags: string[];
  handleTag: (label: string) => void;
}) => {
  const listTags = useTags();

  return (
    <div className="flex w-full flex-col gap-3 items-start justify-start pl-[15px] pr-[15px] mx-0 sm:flex-row sm:p-0 sm:items-center">
      <div>Tags:</div>
      <div className="flex gap-3 flex-wrap ">
        {listTags.map((t) => (
          <div
            key={t.value}
            onClick={() => handleTag(t.value)}
            className={`${
              tags.some((item) => item === t.value) && "gap-2 bg-[#FEF6EE]"
            } p-2 rounded border text-sm flex items-center  cursor-pointer`}
          >
            {tags.some((item) => item === t.value) && <IconCheckYellow />}
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagAllProject;
