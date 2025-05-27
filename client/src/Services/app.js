import axiosConfig from "../aixosConfig";
import axiosDefault from "axios";

export const apiGetPrices = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/price/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetArea = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/area/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetProvinces = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/province/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPublicProvince = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "get",
        url: "https://provinces.open-api.vn/api/p/",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPublicDistrict = (provinceId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "get",
        url: `https://provinces.open-api.vn/api/p/${provinceId}?depth=2`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
