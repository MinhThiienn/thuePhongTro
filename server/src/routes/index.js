import authRouter from "./auth";
import insertRouter from "./insert";
import catagoryRouter from "./category";
import postRouter from "./post";
import pricesRouter from "./price";
import areaRouter from "./area";
import provinceRouter from "./province";
import CurrentUser from "./user";
const initRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/insert", insertRouter);
  app.use("/api/v1/category", catagoryRouter);
  app.use("/api/v1/post", postRouter);
  app.use("/api/v1/price", pricesRouter);
  app.use("/api/v1/area", areaRouter);
  app.use("/api/v1/province", provinceRouter);
  app.use("/api/v1/user", CurrentUser);

  // Đặt cuối cùng để bắt các request không hợp lệ
  app.use((req, res) => {
    res.status(404).send("Route not found");
  });

  return app;
};

export default initRoutes;
