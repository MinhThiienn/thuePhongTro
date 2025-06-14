import * as favoriteService from "../services/favoriteService.js";
export const addFavorite = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy userId từ token (middleware gán)
    const { postId } = req.body;
    const response = await favoriteService.addFavorite(userId, postId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to add favorite: " + error.message,
    });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy userId từ token
    const { postId } = req.body;
    const response = await favoriteService.removeFavorite(userId, postId);
    return res.status(200).json({ msg: "Removed favorite successfully" });
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to remove favorite: " + error.message,
    });
  }
};

export const getFavoritesByUser = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy userId từ token
    const response = await favoriteService.getFavoritesByUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to fetch favorites: " + error.message,
    });
  }
};

export const getFavoritesLimit = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy userId từ token
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const favorites = await favoriteService.getFavoritesLimit(
      userId,
      +limit,
      +offset
    );
    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed to get favorite posts with limit: " + error.message,
    });
  }
};
