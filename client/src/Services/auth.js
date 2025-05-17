import axiosConfig from "../aixosConfig";

export const apiRegister = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/auth/register",
        data: payload,
      });
      resolve(response); // Gọi resolve khi có phản hồi thành công
    } catch (error) {
      reject(error); // Gọi reject nếu có lỗi
    }
  });

export const apiLogin = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/auth/login",
        data: payload,
      });
      resolve(response); // Gọi resolve khi có phản hồi thành công
    } catch (error) {
      reject(error); // Gọi reject nếu có lỗi
    }
  });
