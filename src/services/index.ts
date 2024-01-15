import axiosInstance from "@/configs/axios.config";

export const getProjectGeneral = () => {
  return axiosInstance.get(`/project/general`);
};

export const getProject = () => {
  return axiosInstance.get(`/project`);
};

export const searchProjectName = ({ page, limit, sort, title }: any) => {
  return axiosInstance.get(
    `/project?${title ? "title=" + title : ""}&page=${
      page ?? 1
    }&limit=${limit}&${sort ? "sort=" + sort : ""}`,
  );
};
