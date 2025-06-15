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

export const apiGetAllUsers = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/user/all-users",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiDeleteUser = (id, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "delete",
        url: `/api/v1/user/delete-user/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiResetPassWord = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: `/api/v1/user/reset-password/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiAdminUpdateUser = (id, payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: `/api/v1/user/admin/user/${id}`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiBuyVIP = (packageId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/user/buy-vip",
        data: { packageId },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiCancelVIP = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/user/cancel-vip",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
