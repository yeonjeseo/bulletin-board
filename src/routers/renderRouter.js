import express from "express";
import {
  home,
  getDetail,
  getPostings,
} from "../controller/postingController.js";
import { getLogin, getSignup } from "../controller/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/comment", getPostings);
rootRouter.get("/comment/:id", getDetail);
rootRouter.get("/signup", getSignup);
rootRouter.get("/login", getLogin);

// rootRouter.get("/comment", getPosting)

export default rootRouter;
