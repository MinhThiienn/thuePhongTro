import express from "express";
require("dotenv").config();
import cors from "cors";

import connectDatabase from "./src/config/connectDB";
import { dataPrices, dataArea } from "./ultis/data";
import initRoutes from "./src/routes";
import generateDate from "./ultis/generateDate";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

initRoutes(app);
connectDatabase();

const port = process.env.PORT || 8888;

const server = app.listen(port, () => {
  console.log(`Server running on the port ${port}`);
});
