import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      err: 1,
      msg: "Missing or malformed accessToken",
    });
  }

  const accessToken = authHeader.split(" ")[1];

  jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({
        err: 1,
        msg: "Access token expired or invalid",
      });
    }

    req.user = user;
    next();
  });
};

export default verifyToken;
