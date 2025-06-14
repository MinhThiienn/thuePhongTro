import { where } from "sequelize";
import db from "../models";
const bcrypt = require("bcryptjs");

// GET CURRENT USER
export const getOneUser = async (id) => {
  try {
    const response = await db.User.findOne({
      raw: true,
      where: { id },
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
    if (payload.password) {
      payload.password = bcrypt.hashSync(
        payload.password,
        bcrypt.genSaltSync(12)
      );
    }

    const [affectedRows] = await db.User.update(payload, {
      where: { id },
    });

    return {
      err: affectedRows > 0 ? 0 : 1,
      msg:
        affectedRows > 0
          ? "Updated user successfully"
          : "Failed to update user",
      affectedRows,
    };
  } catch (error) {
    throw error;
  }
};

export const verifyPassword = async ({ id, password }) => {
  try {
    const user = await db.User.findOne({
      raw: true,
      where: { id },
      attributes: ["password"],
    });

    if (!user) {
      return {
        err: 1,
        msg: "User không tồn tại",
        valid: false,
      };
    }

    const valid = await bcrypt.compare(password, user.password);

    return {
      err: valid ? 0 : 1,
      msg: valid ? "Mật khẩu đúng" : "Mật khẩu cũ không đúng",
      valid,
    };
  } catch (error) {
    throw error;
  }
};
