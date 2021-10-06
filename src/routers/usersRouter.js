import express from "express";
import { postSignup, postAuth, getMe } from "../controller/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/", postSignup);
userRouter.post("/auth", postAuth);

// 페이지 별로 로그인 검사를 위해 별도 API 준비
userRouter.get("/me", authMiddleware, getMe);
export default userRouter;
