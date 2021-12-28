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
/**
 * @swagger
 * tags:
 *  name: Postings
 *  description: Postings management
 */
postingRouter
  .route("/")
  .get(readAllPostings)
  .post(authMiddleware, postPostings);
/**
 * @swagger
 * path:
 *  /api/postings
 *    get:
 *      summary: Select Postings
 *      tags: [Postings]
 *      response:
 *        "200":
 *          descripttions : A Postings schema
 */

postingRouter
  .route("/:id")
  .patch(authMiddleware, patchPostings)
  .delete(authMiddleware, deletePostings);

postingRouter
  .route("/:id/comments")
  .post(authMiddleware, postComment)
  .get(authMiddleware, getComments)
  .delete(authMiddleware, deleteComment)
  .patch(authMiddleware, patchComment);

export default postingRouter;
