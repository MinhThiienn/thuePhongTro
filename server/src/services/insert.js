import db from "../models";
import bcrypt from "bcryptjs";
import chothuematbang from "../../data/chothuematbang.json";
import chothuecanho from "../../data/chothuecanho.json";
import nhachothue from "../../data/nhachothue.json";
import chothuephongtro from "../../data/chothuephongtro.json";
import { v4 } from "uuid";
import generateCode from "../../ultis/generateCode";
import { dataPrices, dataArea } from "../../ultis/data";
import { getNumberFromString, getNumberFromStringV2 } from "../../ultis/common";
require("dotenv").config();

const dataBody = [
  { body: chothuephongtro.body, code: "CTPT" },
  { body: chothuematbang.body, code: "CTMB" },
  { body: chothuecanho.body, code: "CTCH" },
  { body: nhachothue.body, code: "NCT" },
];

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const insertService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const provinceCodes = [];
      const labelCodes = [];

      for (const cate of dataBody) {
        for (const item of cate.body) {
          const postId = v4();
          const labelCode = generateCode(item?.header?.class?.classType).trim();
          if (!labelCodes.some((l) => l.code === labelCode)) {
            labelCodes.push({
              code: labelCode,
              value: item?.header?.class?.classType?.trim(),
            });
          }

          const provinceRaw = item?.header?.address?.split(",")?.slice(-1)[0];
          const provinceCode = generateCode(provinceRaw).trim();
          if (!provinceCodes.some((p) => p.code === provinceCode)) {
            provinceCodes.push({
              code: provinceCode,
              value: provinceRaw.trim(),
            });
          }

          const attributesId = v4();
          const userId = v4();
          const imagesId = v4();
          const overviewId = v4();
          const desc = JSON.stringify(item?.mainContent?.content);

          const currentArea = getNumberFromString(
            item?.header?.attributes?.acreage
          );
          const currentPrice = getNumberFromString(
            item?.header?.attributes?.price
          );

          // Create Post
          await db.Post.create({
            id: postId,
            title: item?.header?.title,
            star: item?.header?.star,
            labelCode,
            address: item?.header?.address,
            attributesId,
            categoryCode: cate.code,
            description: desc,
            userId,
            overviewId,
            imagesId,
            areaCode: dataArea.find(
              (area) => area.max > currentArea && area.min <= currentArea
            )?.code,
            priceCode: dataPrices.find(
              (price) => price.max > currentPrice && price.min <= currentPrice
            )?.code,
            provinceCode,
            priceNumber: getNumberFromStringV2(item?.header?.attributes?.price),
            areaNumber: getNumberFromStringV2(
              item?.header?.attributes?.acreage
            ),
          });

          // Create Attributes
          await db.Attribute.create({
            id: attributesId,
            price: item?.header?.attributes?.price,
            acreage: item?.header?.attributes?.acreage,
            published: item?.header?.attributes?.published,
            hashtag: item?.header?.attributes?.hashtag,
          });

          // Create Images
          await db.Image.create({
            id: imagesId,
            image: JSON.stringify(item?.images),
          });

          // Create Overview
          const overview = item?.overview?.content || [];
          await db.Overview.create({
            id: overviewId,
            code: overview.find((i) => i.name === "Mã tin:")?.content,
            area: overview.find((i) => i.name === "Khu vực")?.content,
            type: overview.find((i) => i.name === "Loại tin rao:")?.content,
            target: overview.find((i) => i.name === "Đối tượng thuê:")?.content,
            bonus: overview.find((i) => i.name === "Gói tin:")?.content,
            created: overview.find((i) => i.name === "Ngày đăng:")?.content,
            expired: overview.find((i) => i.name === "Ngày hết hạn:")?.content,
          });

          // Create User
          const contact = item?.contact?.content || [];
          await db.User.create({
            id: userId,
            name:
              contact.find((i) => i.name === "Liên hệ:")?.content || "No name",
            password: hashPassword("123456"),
            phone: contact.find((i) => i.name === "Điện thoại:")?.content || "",
            zalo: contact.find((i) => i.name === "Zalo")?.content || "",
          });
        }
      }

      for (const item of provinceCodes) {
        await db.Province.findOrCreate({
          where: { code: item.code },
          defaults: item,
        });
      }

      for (const item of labelCodes) {
        await db.Label.findOrCreate({
          where: { code: item.code },
          defaults: item,
        });
      }

      resolve("Done.");
    } catch (error) {
      reject(error);
    }
  });

export const createPricesAndAreas = () =>
  new Promise(async (resolve, reject) => {
    try {
      for (const [index, item] of dataPrices.entries()) {
        await db.Price.findOrCreate({
          where: { code: item.code },
          defaults: {
            code: item.code,
            value: item.value,
            order: index + 1,
          },
        });
      }
      for (const [index, item] of dataArea.entries()) {
        await db.Area.findOrCreate({
          where: { code: item.code },
          defaults: {
            code: item.code,
            value: item.value,
            order: index + 1,
          },
        });
      }
      resolve("OK");
    } catch (err) {
      reject(err);
    }
  });
