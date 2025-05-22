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
