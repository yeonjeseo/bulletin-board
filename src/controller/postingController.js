import Post from "../models/Post.js";
import bcrypt from "bcrypt";

export const home = async (req, res) => {
  return res.render("main");
};

export const getPostings = async (req, res) => {
  return res.render("create");
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  return res.render("edit", { post });
};

export const getDetail = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  return res.render("detail", { post });
};

// CRUD : C
export const postPostings = async (req, res) => {
  const { title, comment } = req.body;
  const author = res.locals.user.username;
  console.log(author);
  let password = req.body.password;

  password = await bcrypt.hash(password, 5);

  const post = {
    title,
    author,
    comment,
    password,
  };

  await Post.create(post);

  return res.send({ result: "success" });
};

// CRUD : Read
export const readAllPostings = async (req, res) => {
  const comments = await Post.find({}).sort({ createdAt: -1 });

  return res.status(200).send({ result: "READ all success", comments });
};

// CRUD : U
export const patchPostings = async (req, res) => {
  const { title, comment, password } = req.body;
  const { id } = req.params;

  const post = await Post.findById(id);
  // compare pw
  const isMatched = await bcrypt.compare(password, post.password);
  // const isMatched =  bcrypt.compareSync(password, post.password);

  if (isMatched) {
    try {
      await Post.updateOne(post, {
        $set: {
          title,
          comment,
        },
      });
      return res
        .status(200)
        .send({ result: "success", msg: "수정 완료되었습니다." });
    } catch (err) {
      return res.status(400).send({ result: "UPDATE failure", msg: err });
    }
  } else {
    return res
      .status(400)
      .send({ result: "failure", msg: "비밀번호가 일치하지 않습니다." });
  }
};

// CRUD : D
export const deletePostings = async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;

  const post = await Post.findById(id);

  const isMatched = await bcrypt.compare(password, post.password);

  if (isMatched) {
    try {
      await Post.deleteOne(post);
      // await Post.findByIdAndRemove(id);
      return res
        .status(200)
        .send({ result: "DELETE success", msg: "삭제 완료되었습니다." });
    } catch {
      return res
        .status(400)
        .send({ result: "DELETE failure", msg: "삭제 실패했습니다." });
    }
  } else {
    return res
      .status(400)
      .send({ result: "DELETE failure", msg: "비밀번호가 일치하지 않습니다." });
  }
};
