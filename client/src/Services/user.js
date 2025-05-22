import axiosConfig from "../aixosConfig";

export const apiGetCurrentUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/user/get-currentUser",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
