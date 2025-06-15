import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
require("dotenv").config();

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const registerService = ({ phone, password, name }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { phone },
        defaults: {
          phone,
          name,
          password: hashPassword(password),
          id: v4(),
        },
      });
      const token =
        response[1] &&
        jwt.sign(
          { id: response[0].id, phone: response[0].phone },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Register is successfully !"
          : "Phone number has been aldready used !",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });
export const loginService = ({ phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({ where: { phone }, raw: true });

      const isCorrect =
        response && bcrypt.compareSync(password, response.password);

      if (isCorrect) {
        const token = jwt.sign(
          { id: response.id, phone: response.phone, isAdmin: response.isAdmin },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );

        resolve({
          err: 0,
          msg: "Login successfully!",
          token,
          isAdmin: response.isAdmin,
        });
      } else if (response) {
        resolve({
          err: 2,
          msg: "Incorrect password!",
          token: null,
          isAdmin: false,
        });
      } else {
        resolve({
          err: 2,
          msg: "User not found!",
          token: null,
          isAdmin: false,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
