import express from "express";
import {
  postPostings,
  patchPostings,
  deletePostings,
  readAllPostings,
  postComment,
  getComments,
  deleteComment,
  patchComment,
} from "../controller/postingController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const postingRouter = express.Router();

postingRouter
  .route("/")
  .get(readAllPostings)
  .post(authMiddleware, postPostings);
// postingRouter.get("/", readAllPostings);
// postingRouter.post("/", authMiddleware, postPostings);
postingRouter
  .route("/:id")
  .patch(authMiddleware, patchPostings)
  .delete(authMiddleware, deletePostings);
// postingRouter.patch("/:id", patchPostings);
// postingRouter.delete("/:id", deletePostings);
postingRouter
  .route("/:id/comments")
  .post(authMiddleware, postComment)
  .get(authMiddleware, getComments)
  .delete(authMiddleware, deleteComment)
  .patch(authMiddleware, patchComment);
// postingRouter.post("/:id/comments", authMiddleware, postComment);

export default postingRouter;
