import actionTypes from "./actionTypes";
import {
  apiGetCurrentUser,
  apiGetAllUsers,
  apiDeleteUser,
} from "../../Services/user";

export const getCurrentUser = () => async (dispatch) => {
  try {
    const response = await apiGetCurrentUser();

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_CURRENT,
        currentUser: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_CURRENT,
        msg: response.data.msg,
        currentUser: null,
      });
      dispatch({ type: actionTypes.LOGOUT });
    }
  } catch (error) {
    dispatch({ type: actionTypes.GET_CURRENT, currentUser: null, msg: error });
    dispatch({ type: actionTypes.LOGOUT });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const response = await apiGetAllUsers();

    if (response?.data?.err === 0) {
      dispatch({
        type: actionTypes.GET_ALL_USERS,
        allUsers: response.data.data,
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALL_USERS,
        allUsers: [],
        msg: response?.data?.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_USERS,
      allUsers: [],
      msg: error?.message,
    });
  }
};
export const deleteUser = (id) => async (dispatch) => {
  try {
    const response = await apiDeleteUser(id);
    if (response?.data?.err === 0) {
      dispatch({
        type: actionTypes.DELETE_USER,
        payload: id,
        msg: "Xóa người dùng thành công!",
      });
    } else {
      dispatch({
        type: actionTypes.DELETE_USER,
        payload: null,
        msg: response?.data?.msg || "Xóa người dùng thất bại!",
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_USER,
      payload: null,
      msg: error?.message || "Đã xảy ra lỗi!",
    });
  }
};
