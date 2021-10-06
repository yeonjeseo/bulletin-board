import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  ownedPosting: { type: mongoose.Types.ObjectId, required: true },
  author: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
