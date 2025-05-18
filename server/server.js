import express from "express";
require("dotenv").config();
import cors from "cors";

import connectDatabase from "./src/config/connectDB";
import { dataPrices, dataArea } from "./ultis/data";
import initRoutes from "./src/routes";
console.log(dataPrices);
console.log(dataArea);
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
