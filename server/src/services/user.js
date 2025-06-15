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
    const allowed = ["name", "phone", "zalo", "fbUrl", "avatar", "password"];
    const updatePayload = {};

    for (const key of allowed) {
      if (payload[key] !== undefined) {
        updatePayload[key] = payload[key];
      }
    }
    if (updatePayload.password) {
      updatePayload.password = bcrypt.hashSync(
        updatePayload.password,
        bcrypt.genSaltSync(12)
      );
    }
    const [affectedRows] = await db.User.update(updatePayload, {
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

export const getAllUsers = async () => {
  try {
    const users = await db.User.findAll({});
    return users;
  } catch (error) {
    throw error;
  }
};
export const deleteUser = async (id) => {
  try {
    await db.Post.destroy({ where: { UserId: id } });

    const affectedRows = await db.User.destroy({ where: { id } });

    return {
      err: affectedRows > 0 ? 0 : 1,
      msg:
        affectedRows > 0
          ? "Xóa tài khoản cùng tất cả bài đăng thành công"
          : "Không tìm thấy tài khoản để xóa",
    };
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (id) => {
  try {
    const newPass = Math.random().toString(36).slice(-8);
    const hashed = bcrypt.hashSync(newPass, bcrypt.genSaltSync(12));

    const [affectedRows] = await db.User.update(
      { password: hashed },
      { where: { id } }
    );

    if (affectedRows > 0) {
      return {
        err: 0,
        msg: "Đặt lại mật khẩu thành công",
        newPass,
      };
    } else {
      return {
        err: 1,
        msg: "Không tìm thấy tài khoản",
      };
    }
  } catch (error) {
    throw error;
  }
};

export const updateUserByAdmin = async ({ id, payload }) => {
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
          ? "Cập nhật tài khoản bởi admin thành công"
          : "Không tìm thấy tài khoản để cập nhật",
      affectedRows,
    };
  } catch (error) {
    throw error;
  }
};
export const buyVIPPackage = async ({ id, packageId }) => {
  const packages = {
    1: { price: 30000, days: 7, star: 3 },
    2: { price: 40000, days: 14, star: 4 },
    3: { price: 50000, days: 30, star: 5 },
  };
  const pack = packages[packageId];
  if (!pack) {
    return { err: 1, msg: "Gói VIP không tồn tại" };
  }

  const user = await db.User.findOne({ where: { id } });
  if (!user) {
    return { err: 1, msg: "Tài khoản không tồn tại" };
  }
  if (user.balance < pack.price) {
    return { err: 1, msg: "Số dư tài khoản không đủ" };
  }
  if (
    user.vipLevel &&
    user.vipExpire &&
    new Date(user.vipExpire) > new Date()
  ) {
    return { err: 1, msg: "Tài khoản của bạn vẫn còn gói VIP chưa hết hạn" };
  }

  // Tính thời gian hết hạn
  const expire = new Date();
  expire.setDate(expire.getDate() + pack.days);

  await db.User.update(
    {
      balance: user.balance - pack.price,
      vipLevel: packageId,
      vipExpire: expire,
      vipStar: pack.star,
    },
    { where: { id } }
  );

  return { err: 0, msg: "Mua gói VIP thành công" };
};

export const cancelVIP = async (id) => {
  const user = await db.User.findOne({ where: { id } });
  if (!user) {
    return { err: 1, msg: "Tài khoản không tồn tại" };
  }
  if (user.vipLevel <= 0) {
    return { err: 1, msg: "Tài khoản chưa mua gói VIP" };
  }

  let refundable = 0;
  if (new Date(user.vipExpire) > new Date()) {
    refundable = 0.5;
  }

  const packages = {
    1: { price: 30000 },
    2: { price: 40000 },
    3: { price: 50000 },
  };
  const pack = packages[user.vipLevel] || { price: 0 };

  const amountRefund = pack.price * refundable;

  await db.User.update(
    {
      vipLevel: 0,
      vipExpire: null,
      balance: user.balance + amountRefund,
    },
    { where: { id } }
  );

  await db.Post.update({ star: "0" }, { where: { userId: id } });

  return { err: 0, msg: "Đã hủy gói VIP và hoàn lại " + amountRefund + " VNĐ" };
};
