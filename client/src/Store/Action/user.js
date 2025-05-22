import actionTypes from "./actionTypes";
import { apiGetCurrentUser } from "../../Services/user";

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
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CURRENT,
      currentUser: null,
      msg: error,
    });
  }
};
