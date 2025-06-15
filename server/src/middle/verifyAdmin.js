const verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin !== 1) {
    return res.status(403).json({ err: 1, msg: "Forbidden: Admin only" });
  }
  next();
};

export default verifyAdmin;
