import { where } from "sequelize";
import db from "../models";
import { v4 as generateId } from "uuid";
import moment from "moment";
import generateCode from "../../ultis/generateCode";
import generateDate from "../../ultis/generateDate";
require("dotenv").config();
const { Op, UUID } = require("sequelize");
export const getPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
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
        ],

        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting posts is  failed",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getPostsServiceLimit = (
  page,
  { limitPost, order, ...query },
  { priceNumber, areaNumber }
) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      const queries = {
        ...query,
      };
      const limit = +limitPost || +process.env.LIMIT;
      queries.limit = limit;
      if (priceNumber) query.priceNumber = { [Op.between]: priceNumber };
      if (areaNumber) query.areaNumber = { [Op.between]: areaNumber };
      if (order) queries.order = [order];
      const response = await db.Post.findAndCountAll({
        where: query,
        raw: true,
        nest: true,
        offset: offset * limit,
        ...queries,
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
        ],

        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting posts is  failed",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getNewPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        offset: 0,
        order: [["createdAt", "DESC"]],
        limit: +process.env.LIMIT,

        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
        ],

        attributes: ["id", "title", "star", "createdAt"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting posts is  failed",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const createNewPostsService = async (body, userId) => {
  try {
    const attributesId = generateId();
    const imagesId = generateId();
    const overviewId = generateId();
    const labelCode = generateCode(body.label);
    const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`;
    const currentDate = generateDate();

    // Tạo code và kiểm tra province
    const provinceCode = body.province?.includes("Thành phố")
      ? generateCode(body?.province?.replace("Thành phố", ""))
      : generateCode(body?.province?.replace("Tỉnh", ""));

    // Tìm hoặc tạo province mới
    let province = await db.Province.findOne({
      where: { code: provinceCode },
    });

    if (!province) {
      province = await db.Province.create({
        code: provinceCode,
        value: body.province?.includes("Thành phố")
          ? body?.province?.replace("Thành phố", "")
          : body?.province?.replace("Tỉnh", ""),
      });
    }

    const response = await db.Post.create({
      id: generateId(),
      title: body.title || null,
      labelCode,
      address: body.address || null,
      attributesId,
      categoryCode: body.categoryCode,
      description: body.description ? JSON.stringify(body.description) : null,
      userId,
      overviewId,
      imagesId,
      areaCode: body.areaCode || null,
      priceCode: body.priceCode,
      provinceCode, // lấy code từ trên
      priceNumber: body.priceNumber,
      areaNumber: body.areaNumber,
    });

    await db.Attribute.create({
      id: attributesId,
      price:
        body?.priceNumber < 1
          ? `${body?.priceNumber * 1000000}đồng/tháng`
          : `${body?.priceNumber}triệu/tháng`,
      acreage: `${body?.areaNumber}m²`,
      published: moment(new Date()).format("DD/MM/YYYY"),
      hashtag: hashtag,
    });

    await db.Image.create({
      id: imagesId,
      image: JSON.stringify(body.images),
    });

    await db.Overview.create({
      id: overviewId,
      code: hashtag,
      area: body?.label,
      type: body?.category,
      target: body?.target,
      bonus: "Tin thường",
      created: currentDate.today,
      expired: currentDate.expireDate,
    });

    // Tạo label nếu chưa có
    await db.Label.findOrCreate({
      where: {
        code: labelCode,
      },
      defaults: {
        code: labelCode,
        value: body?.label,
      },
    });

    return {
      err: 0,
      msg: "OK",
      response,
    };
  } catch (error) {
    throw error;
  }
};

export const getPostsServiceLimitAdmin = (page, id, query) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      const queries = {
        ...query,
        userId: id,
      };
      const response = await db.Post.findAndCountAll({
        where: queries,
        raw: true,
        nest: true,
        offset: offset * +process.env.LIMIT,
        limit: +process.env.LIMIT,
        order: [["createdAt", "DESC"]],

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
          {
            model: db.Overview,
            as: "overview",
          },
        ],

        // attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Getting posts is  failed",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const updatePostService = async (body) => {
  try {
    const { postId, attributesId, imagesId, overviewId, userId } = body;
    const labelCode = generateCode(body.label);
    const currentDate = generateDate();

    // Tạo code và kiểm tra province
    const provinceCode = body.province?.includes("Thành phố")
      ? generateCode(body?.province?.replace("Thành phố", ""))
      : generateCode(body?.province?.replace("Tỉnh", ""));

    // Tìm hoặc tạo province mới
    let province = await db.Province.findOne({
      where: { code: provinceCode },
    });

    if (!province) {
      province = await db.Province.create({
        code: provinceCode,
        value: body.province?.includes("Thành phố")
          ? body?.province?.replace("Thành phố", "")
          : body?.province?.replace("Tỉnh", ""),
      });
    }

    // Cập nhật bảng Post
    const postUpdate = await db.Post.update(
      {
        title: body.title || null,
        labelCode,
        address: body.address || null,
        categoryCode: body.categoryCode,
        description: body.description ? JSON.stringify(body.description) : null,
        userId,
        areaCode: body.areaCode || null,
        priceCode: body.priceCode,
        provinceCode,
        priceNumber: body.priceNumber,
        areaNumber: body.areaNumber,
      },
      { where: { id: postId } }
    );

    // Cập nhật bảng Attribute
    await db.Attribute.update(
      {
        price:
          body?.priceNumber < 1
            ? `${body?.priceNumber * 1000000}đồng/tháng`
            : `${body?.priceNumber}triệu/tháng`,
        acreage: `${body?.areaNumber}m²`,
        // Giữ nguyên published và hashtag nếu không thay đổi
      },
      { where: { id: attributesId } }
    );

    // Cập nhật bảng Image
    await db.Image.update(
      {
        image: JSON.stringify(body.images),
      },
      { where: { id: imagesId } }
    );

    // Cập nhật bảng Overview
    await db.Overview.update(
      {
        area: body?.label,
        type: body?.category,
        target: body?.target,
        // giữ nguyên created & expired nếu không thay đổi
      },
      { where: { id: overviewId } }
    );

    // Tạo label nếu chưa có
    await db.Label.findOrCreate({
      where: {
        code: labelCode,
      },
      defaults: {
        code: labelCode,
        value: body?.label,
      },
    });

    return {
      err: 0,
      msg: "Updated successfully",
    };
  } catch (error) {
    throw error;
  }
};

export const deletePost = (postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.destroy({
        where: { id: postId },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        msg: response > 0 ? "Deleted" : "No posts delete",
      });
    } catch (error) {
      reject(error);
    }
  });
