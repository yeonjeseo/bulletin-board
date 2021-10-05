import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
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
  //post의 id를 가져옴
  const { id } = req.params;
  //post를 검색하고 거기 딸려있는 comments를 populate함.
  const post = await Post.findById(id);

  //populate한 뒤에 내부 속성을 활용해서 정렬하기
  // const post = await Post.findById(id).populate({
  //   path: "comments",
  //   options: { sort: { createdAt: -1 } },
  // });

  const comments = await Comment.find({ ownedPosting: id })
    .populate("author")
    .sort({ createdAt: -1 });
  console.log(comments);
  return res.render("detail", { post, comments });
};

// CRUD : C
export const postPostings = async (req, res) => {
  const { title, text } = req.body;
  const author = res.locals.user.username;
  console.log(author);
  let password = req.body.password;

  password = await bcrypt.hash(password, 5);

  const post = {
    title,
    author,
    text,
    password,
  };

  await Post.create(post);

  return res.send({ result: "success" });
};

// CRUD : Read
export const readAllPostings = async (req, res) => {
  const postings = await Post.find({}).sort({ createdAt: -1 });

  return res.status(200).send({ result: "READ all success", postings });
};

// CRUD : U
export const patchPostings = async (req, res) => {
  const { title, text, password } = req.body;
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
          text,
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

// 댓글 CRUD
//댓글 만들기
export const postComment = async (req, res) => {
  //1. 필요한 데이터 받기
  const {
    body: { text },
    params: { id: postingId },
  } = req;
  const userId = res.locals.user._id;

  const comment = {
    ownedPosting: postingId,
    author: userId,
    text,
  };
  try {
    //2. Comment 모델에 저장
    const newComment = await Comment.create(comment);
    const commentId = newComment._id;

    //3. 해당 user의 comments에 푸시
    await User.findByIdAndUpdate(userId, {
      $push: { comments: commentId },
    });

    //4. Post 모델의 comment에 푸시
    await Post.findByIdAndUpdate(postingId, {
      $push: { comments: commentId },
    });

    // console.log(await newComment.populate("ownedPosting"));
    return res.status(200).send({ msg: "댓글 작성 완료!" });
  } catch (error) {
    return res.status(400).send({ msg: "댓글 작성 실패 ㅠㅠ" });
  }
};

export const getComments = async (req, res) => {
  console.log(req.params);
};
