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
