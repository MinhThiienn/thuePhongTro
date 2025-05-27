import actionTypes from "./actionTypes";
import { apiGetCategories } from "../../Services/category";
import { apiGetArea, apiGetPrices, apiGetProvinces } from "../../Services/app";

export const getCategories = () => async (dispatch) => {
  try {
    const response = await apiGetCategories();

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_CATEGORIES,
        categories: response.data.response,
        msg: "",
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
      categories: null,
    });
  }
};

export const getPrices = () => async (dispatch) => {
  try {
    const response = await apiGetPrices();

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_PRICES,
        prices: response.data.response.sort((a, b) => {
          return +a.order - +b.order;
        }),
        msg: "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_PRICES,
        prices: null,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRICES,
      prices: null,
    });
  }
};

export const getArea = () => async (dispatch) => {
  try {
    const response = await apiGetArea();

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_AREAS,
        areas: response.data.response.sort(
          (a, b) => (parseInt(a.order) || 0) - (parseInt(b.order) || 0)
        ),
        msg: "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_AREAS,
        areas: null,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_AREAS,
      areas: null,
      msg: error.message || "Lỗi kết nối đến server",
    });
  }
};

export const getProvinces = () => async (dispatch) => {
  try {
    const response = await apiGetProvinces();

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_PROVINCES,
        provinces: response.data.response,
        msg: "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_PROVINCES,
        provinces: null,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PROVINCES,
      arprovinceseas: null,
      msg: error.message || "Lỗi kết nối đến server",
    });
  }
};
