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
