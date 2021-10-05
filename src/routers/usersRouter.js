import express from "express";
import { postSignup, postAuth, getMe } from "../controller/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("", postSignup);
userRouter.post("/auth", postAuth);
userRouter.get("/me", authMiddleware, getMe);
export default userRouter;
