import express from "express";
import {
  postPostings,
  patchPostings,
  deletePostings,
  readAllPostings,
} from "../controller/postingController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const commentRouter = express.Router();

commentRouter.get("", readAllPostings);
commentRouter.post("", authMiddleware, postPostings);
commentRouter.patch("/:id", patchPostings);
commentRouter.delete("/:id", deletePostings);

export default commentRouter;
