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
  console.log(id);

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
