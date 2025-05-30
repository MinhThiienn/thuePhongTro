import { where } from "sequelize";
import db from "../models";

// GET CURRENT USER
export const getOneUser = async (id) => {
  try {
    const response = await db.User.findOne({
      raw: true,
      where: { id },
      attributes: { exclude: ["password"] },
    });

    return {
      err: response ? 0 : 1,
      msg: response ? "OK" : "Failed to get current user.",
      response,
    };
  } catch (error) {
    throw error;
  }
};

// UPDATE CURRENT USER
export const updateUser = async ({ payload, id }) => {
  try {
    const response = await db.User.update(payload, {
      where: { id },
    });

    return {
      err: response[0] > 0 ? 0 : 1,
      msg: response[0] > 0 ? "Updated" : "Failed to update current user.",
      response,
    };
  } catch (error) {
    throw error;
  }
};
