import * as services from "../services/user";

export const getCurrentUser = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await services.getOneUser(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at get one User controller: " + error,
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.user;
  const payload = req.body;

  try {
    if (!payload)
      return res.status(400).json({
        err: 1,
        msg: "Thiếu payload",
      });
    const response = await services.updateUser({ payload, id });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at update  User controller: " + error,
    });
  }
};

export const verifyPassword = async (req, res) => {
  const { id } = req.user;
  const { password } = req.body;

  try {
    if (!password) {
      return res.status(400).json({
        err: 1,
        msg: "Thiếu mật khẩu",
      });
    }

    const response = await services.verifyPassword({ id, password });

    if (response.err === 0) {
      return res.status(200).json({
        err: 0,
        msg: "Mật khẩu đúng",
        valid: true,
      });
    } else {
      return res.status(401).json({
        err: 1,
        msg: "Mật khẩu cũ không đúng",
        valid: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at verify password controller: " + error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const response = await services.getAllUsers();

    return res.status(200).json({
      err: 0,
      msg: "Lấy danh sách User thành công!",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Lỗi khi lấy danh sách User: " + error,
    });
  }
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ err: 1, msg: "Thiếu ID tài khoản" });
  }

  try {
    await services.deleteUser(id);
    return res.status(200).json({ err: 0, msg: "Xóa tài khoản thành công!" });
  } catch (error) {
    return res
      .status(500)
      .json({ err: -1, msg: "Lỗi khi xóa tài khoản: " + error });
  }
};

export const resetPass = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ err: 1, msg: "Thiếu ID tài khoản" });
  }

  try {
    const result = await services.resetPassword(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ err: -1, msg: "Lỗi khi đặt lại mật khẩu" });
  }
};
export const updateUserByAdmin = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  if (!id) {
    return res.status(400).json({ err: 1, msg: "Thiếu ID tài khoản" });
  }
  if (!payload) {
    return res.status(400).json({ err: 1, msg: "Thiếu payload" });
  }

  try {
    const response = await services.updateUserByAdmin({ id, payload });

    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ err: -1, msg: "Lỗi khi cập nhật tài khoản bởi admin: " + error });
  }
};

export const buyVIPPackage = async (req, res) => {
  const { id } = req.user;
  const { packageId } = req.body;

  if (!packageId) {
    return res.status(400).json({ err: 1, msg: "Thiếu packageId" });
  }

  try {
    const response = await services.buyVIPPackage({ id, packageId });

    if (response.err === 0) {
      return res.status(200).json({ err: 0, msg: "Mua gói VIP thành công" });
    } else {
      return res.status(400).json({ err: 1, msg: response.msg });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ err: -1, msg: "Lỗi khi mua gói VIP: " + error });
  }
};
export const cancelVIP = async (req, res) => {
  const { id } = req.user;

  try {
    const response = await services.cancelVIP(id);

    if (response.err === 0) {
      return res.status(200).json({ err: 0, msg: "Hủy gói VIP thành công" });
    } else {
      return res.status(400).json({ err: 1, msg: response.msg });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ err: -1, msg: "Lỗi khi hủy gói VIP: " + error });
  }
};
