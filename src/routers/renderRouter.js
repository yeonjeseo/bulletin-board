import express from "express";
import {
  home,
  getDetail,
  getPostings,
  getEdit,
} from "../controller/postingController.js";
import { getLogin, getSignup } from "../controller/userController.js";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/postings", getPostings);
rootRouter.get("/postings/:id/detail", getDetail);
rootRouter.get("/postings/:id/edit", getEdit);
rootRouter.get("/signup", getSignup);
rootRouter.get("/login", getLogin);

export default rootRouter;
