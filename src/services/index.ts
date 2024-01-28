import axiosInstance from "@/configs/axios.config";
import axiosGithub from "@/configs/axiosGithub.config";

export const getProjectGeneral = () => {
  return axiosInstance.get(`/project/general`);
};

export const getProject = () => {
  return axiosInstance.get(`/project`);
};

export const getProjectDetail = (id: any) => {
  return axiosInstance.get(`/project/detail/${id}`);
};

export const searchProjectName = ({ page, limit, sort, title, tags }: any) => {
  return axiosInstance.get(
    `/project?${title ? "title=" + title : ""}&page=${
      page ?? 1
    }&limit=${limit}${sort ? "&sort=" + sort : ""}${tags.length ? "&tags=" + tags?.toString() : ""}`,
  );
};

export const getProjectFeatured = () => {
  return axiosInstance.get("/project/featured");
};

export const getListTagRequest = () => {
  return axiosInstance.get("/project/tags");
};


export const getAllPots = () => {
  return axiosInstance.get("/pots");
}

export const searchPotsName = ({ page, limit, sort, title, tags }: any) => {
  return axiosInstance.get(
    `/pots?${title ? "search=" + title : ""}&page=${
      page ?? 1
    }&limit=${limit}${sort ? "&sort=" + sort : ""}${tags.length ? "&tags=" + tags?.toString() : ""}`,
  );
};


export const getListTagPots = () => {
  return axiosInstance.get("/pots/tags");
};

export const getPotsFeatured = () => {
  return axiosInstance.get("/pots/featured");
};

export const getPotsGeneral = () => {
  return axiosInstance.get(`/pots/general`);
};


export const getWhiteListAccountWallet = () => {
  return axiosInstance.get('/pots/white-listed-accounts')
}

export const getApiCommitHash = () => {
  return axiosGithub.get('/repos/PotLock/core/commits')
}

export const getApiProjectRandom = () => {
  return axiosInstance.get('/project/random')
}