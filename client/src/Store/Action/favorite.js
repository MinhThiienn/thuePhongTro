import actionTypes from "./actionTypes";
import {
  apiGetFavoritesByUser,
  apiGetFavoritesLimit,
  apiAddFavorite,
  apiRemoveFavorite,
} from "../../Services/farorite";

export const getFavorites = () => async (dispatch) => {
  try {
    const response = await apiGetFavoritesByUser();

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_FAVORITES,
        favorites: response.data.favorites,
        count: response.data.favorites.length,
        msg: "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_FAVORITES,
        favorites: [],
        count: 0,
        msg: response.data.msg || "Lấy danh sách yêu thích thất bại",
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_FAVORITES,
      favorites: [],
      count: 0,
      msg: "Lỗi kết nối server",
    });
  }
};

export const getFavoritesLimit = (query) => async (dispatch) => {
  try {
    const response = await apiGetFavoritesLimit(query);

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_FAVORITES_LIMIT,
        favorites: response.data.favorites,
        count: response.data.count,
        msg: "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_FAVORITES_LIMIT,
        favorites: [],
        count: 0,
        msg: response.data.msg || "Lấy danh sách có giới hạn thất bại",
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_FAVORITES_LIMIT,
      favorites: [],
      count: 0,
      msg: "Lỗi kết nối server",
    });
  }
};

export const addFavorite = (postId) => async (dispatch) => {
  try {
    const response = await apiAddFavorite(postId);

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.ADD_FAVORITE,
        favorite: response.data.favorite,
        msg: "Thêm bài viết yêu thích thành công",
      });
    } else {
      dispatch({
        type: actionTypes.ADD_FAVORITE,
        msg: response.data.msg || "Thêm bài viết yêu thích thất bại",
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_FAVORITE,
      msg: "Lỗi kết nối server",
    });
  }
};

export const removeFavorite = (postId) => async (dispatch) => {
  try {
    const response = await apiRemoveFavorite(postId);

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.REMOVE_FAVORITE,
        postId,
        msg: "Xóa bài yêu thích thành công",
      });
    } else {
      dispatch({
        type: actionTypes.REMOVE_FAVORITE,
        postId,
        msg: response.data.msg || "Xóa bài yêu thích thất bại",
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.REMOVE_FAVORITE,
      postId,
      msg: "Lỗi kết nối server",
    });
  }
};
