import db from "../models";

export const getProvincesSerivce = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Province.findAll({
        raw: true,
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get Provinces.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
