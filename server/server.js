import express from "express";
require("dotenv").config();
import cors from "cors";
import genarateCode from "./ultis/genarateCode";

import connectDatabase from "./src/config/connectDB";

import initRoutes from "./src/routes";
// console.log(genarateCode(4));
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);
connectDatabase();

const port = process.env.PORT || 8888;
const listener = app.listen(port, () => {
  console.log(`Server running on the port ${listener.address().port}`);
});
