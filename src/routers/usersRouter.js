import express from "express";
import { postSignup, postAuth, getMe } from "../controller/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateSignUp } from "../middlewares/validMiddleware.js";

const userRouter = express.Router();

userRouter.post("/", validateSignUp, postSignup);
userRouter.post("/auth", validateSignUp, postAuth);

// 페이지 별로 로그인 검사를 위해 별도 API 준비
userRouter.get("/me", authMiddleware, getMe);
export default userRouter;
