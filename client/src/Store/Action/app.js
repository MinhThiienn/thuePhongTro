import actionTypes from "./actionTypes";
import { apiGetCategories } from "../../Services/category";

export const getCategories = () => async (dispatch) => {
  try {
    const response = await apiGetCategories();

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_CATEGORIES,
        categories: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_CATEGORIES,
        categories: null,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CATEGORIES,
      posts: null,
    });
  }
};
