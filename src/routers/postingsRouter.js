import express from "express";
import {
  postPostings,
  patchPostings,
  deletePostings,
  readAllPostings,
  postComment,
} from "../controller/postingController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const postingRouter = express.Router();

postingRouter.get("", readAllPostings);
postingRouter.post("", authMiddleware, postPostings);
postingRouter.patch("/:id", patchPostings);
postingRouter.delete("/:id", deletePostings);
postingRouter.post("/:id/comments", authMiddleware, postComment);

export default postingRouter;
