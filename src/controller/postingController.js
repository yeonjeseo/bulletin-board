import Post from "../models/Post.js";
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
  //post를 검색
  const post = await Post.findById(id);

  //populate한 뒤에 내부 속성을 활용해서 정렬하기
  // const post = await Post.findById(id).populate({
  //   path: "comments",
  //   options: { sort: { createdAt: -1 } },
  // });

  const comments = await Comment.find({ ownedPosting: id }).sort({
    createdAt: -1,
  });

  return res.render("detail", { post, comments });
};

const dateConversion = (date) => {
  const yyyy = date.getYear;
};

// CRUD : C
export const postPostings = async (req, res) => {
  const { title, text } = req.body;
  // const { user } = res.locals;
  // const author = res.locals.user.username;

  const { username: author } = res.locals.user;

  let password = req.body.password;
  password = await bcrypt.hash(password, 5);

  const post = {
    title,
    author,
    text,
    password,
  };

  await Post.create(post);

  // await User.findByIdAndUpdate(userId, { $push: { postings: newPosting._id } });
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
  console.log(title, text);
  const { id } = req.params;
  const { user } = res.locals;

  const post = await Post.findById(id);
  // 비밀번호 확인
  const isMatched = await bcrypt.compare(password, post.password);
  if (isMatched) {
    //업데이트 전 로그인 사용자랑 게시글 주인 비교
    if (user.username !== post.author)
      return res
        .status(400)
        .send({ msg: "본인이 작성한 게시글만 수정할 수 있습니다." });

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
  // 데이터 받기
  const { password } = req.body;
  const { id } = req.params;

  //사용자 정보 얻기
  // 미들웨어를 타니까 res.locals에서...
  const { username, _id: userId } = res.locals.user;

  const post = await Post.findById(id);

  // 1. 로그인한 사용자가 포스팅 주인인지 확인
  if (post.author !== username)
    return res.status(400).send({ msg: "본인의 게시물이 아닙니다." });

  // 2. 주인 맞으면 비밀번호 확인
  const isMatched = await bcrypt.compare(password, post.password);
  if (isMatched) {
    // 3. 비밀번호 맞으면
    try {
      //Post에서 삭제
      await Post.deleteOne(post);
      //댓글들 중에서 해당 posting에 종속되는 모든 댓글 삭제
      await Comment.find({ ownedPosting: id }).remove();
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
// 댓글 만들기
export const postComment = async (req, res) => {
  //1. 필요한 데이터 받기
  const {
    body: { text },
    params: { id: postingId },
  } = req;
  const { username: author } = res.locals.user;

  const comment = {
    ownedPosting: postingId,
    author,
    text,
  };

  try {
    //2. Comment 모델에 저장
    await Comment.create(comment);
    return res.status(200).send({ msg: "댓글 작성 완료!" });
  } catch (error) {
    return res.status(400).send({ msg: "댓글 작성 실패 ㅠㅠ" });
  }
};

export const getComments = async (req, res) => {
  console.log(req.params);
};

export const deleteComment = async (req, res) => {
  // 현재 로그인 유저가, 댓글의 작성자랑 같은지 비교하려면 우선
  // 데이터 가져와서 정리
  // DB 조회
  const {
    body: { commentId },
  } = req;
  const { username } = res.locals.user;

  try {
    // 댓글 작성자를 확인하기 위해 해당 댓글 조회
    const comment = await Comment.findById(commentId);
    // 댓글 작성자랑, 현재 로그인한 사람 id 비교
    // 본인이 작성한 글이 아니면,
    if (username !== comment.author)
      return res
        .status(400)
        .send({ msg: "본인이 작성한 댓글만 삭제할 수 있습니다." });

    //댓글 document 삭제
    comment.delete();
    return res.status(200).send({ msg: "삭제 성공!!" });
  } catch (error) {
    return res.status(500).send({ msg: "서버 오류입니다." });
  }
};

export const patchComment = async (req, res) => {
  const { text, commentId } = req.body;
  const { username } = res.locals.user;

  try {
    const comment = await Comment.findById(commentId);

    // 지금 로그인한 사람이 댓글 작성자가 맞는지 확인
    if (username !== comment.author)
      return res
        .status(400)
        .send({ msg: "본인이 작성한 댓글만 수정할 수 있습니다." });

    //본인 댓글이 맞으면 수정
    await Comment.updateOne(comment, {
      $set: { text },
    });

    return res.status(200).send({ msg: "댓글 수정 완료!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "서버 오류입니다." });
  }
};
