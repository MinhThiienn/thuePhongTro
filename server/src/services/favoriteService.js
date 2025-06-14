import db from "../models";
import { Op } from "sequelize";

export const addFavorite = (userId, postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const exists = await db.Favorite.findOne({ where: { userId, postId } });
      if (exists) return resolve({ err: 1, msg: "Post already in favorites." });

      const result = await db.Favorite.create({ userId, postId });
      resolve({
        err: 0,
        msg: "Favorite added successfully.",
        favorite: result,
      });
    } catch (error) {
      reject(error);
    }
  });

export const removeFavorite = (userId, postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const deleted = await db.Favorite.destroy({
        where: { userId, postId },
      });
      resolve({
        err: deleted ? 0 : 1,
        msg: deleted ? "Favorite removed successfully." : "Favorite not found.",
      });
    } catch (error) {
      reject(error);
    }
  });

export const getFavoritesByUser = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const favorites = await db.Favorite.findAll({
        where: { userId },
        include: [
          {
            model: db.Post,
            as: "post",
            attributes: ["id", "title", "star", "address", "description"],
            include: [
              { model: db.Image, as: "images", attributes: ["image"] },
              {
                model: db.Attribute,
                as: "attributes",
                attributes: ["price", "acreage", "published", "hashtag"],
              },
              {
                model: db.User,
                as: "user",
                attributes: ["name", "phone", "zalo", "avatar"],
              },
              { model: db.Overview, as: "overview" },
              {
                model: db.Label,
                as: "labelData",
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
        ],
      });

      resolve({
        err: 0,
        msg: "OK",
        favorites,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getFavoritesLimit = (userId, limit, offset) =>
  new Promise(async (resolve, reject) => {
    try {
      const favorites = await db.Favorite.findAll({
        where: { userId },
        offset,
        limit,
        include: [
          {
            model: db.Post,
            as: "post",
            attributes: ["id", "title", "star", "address", "description"],
            include: [
              { model: db.Image, as: "images", attributes: ["image"] },
              {
                model: db.Attribute,
                as: "attributes",
                attributes: ["price", "acreage", "published", "hashtag"],
              },
              {
                model: db.User,
                as: "user",
                attributes: ["name", "phone", "zalo"],
              },
              { model: db.Overview, as: "overview" },
              {
                model: db.Label,
                as: "labelData",
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
        ],
      });

      const count = await db.Favorite.count({ where: { userId } });

      resolve({
        err: 0,
        msg: "OK",
        favorites: favorites.map((f) => f.post).filter((p) => p !== null), // 🔧 Fix here
        count,
      });
    } catch (error) {
      reject(error);
    }
  });
