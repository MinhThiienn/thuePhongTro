import axiosConfig from "../aixosConfig";

export const apiGetPosts = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/post/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPostLimit = (page) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/post/limit?page=${page}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
