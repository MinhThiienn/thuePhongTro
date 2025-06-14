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
