import axios from "axios";
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
export const apiUpdateUser = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: "/api/v1/user/",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiVerifyPassword = (password) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/user/verify-password",
        data: { password },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
