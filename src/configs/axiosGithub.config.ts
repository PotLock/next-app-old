import axios from "axios";

const axiosGithub = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_POTLOCK_GITHUB,
  timeout: 30 * 1000, // 30s
  headers: {
    "Content-Type": "application/json",
  },
});

axiosGithub.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response ? error.response : error)
);



export default axiosGithub;
