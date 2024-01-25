import { getListTagRequest } from "@/services";
import { TTag } from "@/types";
import { useEffect, useState } from "react";

export default function useTags() {
  const [listTags, setListTags] = useState<TTag[]>([]);

  const getListTag = async () => {
    try {
      const res = await getListTagRequest();
      setListTags(res?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getListTag();
  }, []);
  return listTags;
}
