import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  postings: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
  comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
});

const User = mongoose.model("User", userSchema);

export default User;
