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
  // Clean query keys
  const cleanedQuery = {};
  for (const key in req.query) {
    const cleanKey = key.endsWith("[]") ? key.slice(0, -2) : key;
    const value = req.query[key];
    if (cleanedQuery[cleanKey]) {
      cleanedQuery[cleanKey] = [].concat(cleanedQuery[cleanKey], value);
    } else {
      cleanedQuery[cleanKey] = value;
    }
  }

  // Lấy page, priceNumber, areaNumber từ cleanedQuery
  const { page, priceNumber, areaNumber, ...restQuery } = cleanedQuery;

  // Parse priceNumber, areaNumber nếu cần
  const parseRange = (val) => {
    if (!val) return null;
    if (Array.isArray(val)) return val.map(Number);
    if (typeof val === "string") return val.split(",").map(Number);
    return null;
  };

  const priceRange = parseRange(priceNumber);
  const areaRange = parseRange(areaNumber);

  try {
    const response = await getPostsService.getPostsServiceLimit(
      page,
      restQuery,
      { priceNumber: priceRange, areaNumber: areaRange }
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error.message,
    });
  }
};

export const getNewPosts = async (req, res) => {
  try {
    const response = await getPostsService.getNewPostsService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller:" + error,
    });
  }
};

export const createNewPost = async (req, res) => {
  try {
    const { categoryCode, title, priceNumber, areaNumber, label } = req.body;
    const { id } = req.user;
    if (!categoryCode || !title || !priceNumber || !areaNumber || !label)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });

    const response = await getPostsService.createNewPostsService(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    console.log("🔥 [createNewPost] Error details:", error);
    return res.status(500).json({
      err: -1,
      msg: "Server error: " + error.message,
    });
  }
};

export const getPostsLimitAdmin = async (req, res) => {
  // Clean query keys
  const cleanedQuery = {};
  for (const key in req.query) {
    const cleanKey = key.endsWith("[]") ? key.slice(0, -2) : key;
    const value = req.query[key];
    if (cleanedQuery[cleanKey]) {
      cleanedQuery[cleanKey] = [].concat(cleanedQuery[cleanKey], value);
    } else {
      cleanedQuery[cleanKey] = value;
    }
  }

  // Lấy page, priceNumber, areaNumber từ cleanedQuery
  const { page, ...restQuery } = cleanedQuery;
  const { id } = req.user;
  // Parse priceNumber, areaNumber nếu cần
  const parseRange = (val) => {
    if (!val) return null;
    if (Array.isArray(val)) return val.map(Number);
    if (typeof val === "string") return val.split(",").map(Number);
    return null;
  };

  try {
    if (!id)
      return res.status(401).json({
        err: 1,
        msg: "Missing user ID",
      });
    const response = await getPostsService.getPostsServiceLimitAdmin(
      page,
      id,
      restQuery
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const { postId, overviewId, imagesId, attributesId, ...payload } = req.body;
  try {
    if (!postId || !payload || !overviewId || !imagesId || !attributesId)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });

    const response = await getPostsService.updatePostService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Server error: " + error.message,
    });
  }
};
