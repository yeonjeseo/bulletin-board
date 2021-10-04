import express from "express";
import {
  home,
  getComment,
  getDetail,
  getSignup,
} from "../controller/controller.js";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/comment", getComment);
rootRouter.get("/comment/:id", getDetail);
rootRouter.get("/signup", getSignup);

// rootRouter.get("/comment", getPosting)

export default rootRouter;
