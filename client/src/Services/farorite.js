import axiosConfig from "../aixosConfig";

export const apiAddFavorite = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: `/api/v1/favorite/add`,
        data: { postId: id },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetFavoritesByUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/favorite/my-favorites`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiRemoveFavorite = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "delete",
        url: `/api/v1/favorite/remove`,
        data: { postId: id },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetFavoritesLimit = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/favorite/limit`,
        params: query,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
