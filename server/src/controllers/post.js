import * as getPostsService from "../services/post";

export const getPosts = async (req, res) => {
  try {
    const response = await getPostsService.getPostsService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller:" + error,
    });
  }
};

export const getPostsLimit = async (req, res) => {
  const { page } = req.query;
  try {
    const response = await getPostsService.getPostsServiceLimit(page);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller:" + error,
    });
  }
};
