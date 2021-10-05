import express from "express";
import { postSignup, postAuth } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("", postSignup);
userRouter.post("/auth", postAuth);

export default userRouter;
