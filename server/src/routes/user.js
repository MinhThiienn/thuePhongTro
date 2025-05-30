import express from "express";
import verifyToken from "../middle/verifyToken";
import * as userController from "../controllers/user";
const router = express.Router();

router.use(verifyToken);
router.get("/get-currentUser", userController.getCurrentUser);
router.put("/", userController.updateUser);

export default router;
