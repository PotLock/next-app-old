import axiosInstance from "@/configs/axios.config";

export const getProjectGeneral = () => {
  return axiosInstance.get(`/project/general`);
};

export const getProject = () => {
    return axiosInstance.get(`/project`);
  };

  export const searchProjectName = (name: any) => {
    return axiosInstance.get(`/project?title=${name}`);
  };
  
  
