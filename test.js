import Post from './src/models/Post'

1. 프론트 자바스크립트

(1). html에서 데이터 가져오기
const comment = document.getElementById("comment").value;
const comment = $("#comment").val();

(2). ajax 요청
function patchComment async () {

  console.log(comment);
  const response = await fetch(`/api/comment/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({comment}),
  });

  // console.log(response);
  // success: 어쩌꾸...comment..
}

2. 백엔드 자바스크립트 

(1) Route 생성
app.use("/api", apiRouter);


(2) 길 잘 뚫었는지 확인
apiRouter.patch("/comment/:id" , (req, res) => {
  // const {id} = req.params;
  const {id} = req.query;
  const {comment} = req.body;
  console.log(id, comment);
/////////////////


  // const post = await Post.findByIdAndUpdate(id, {
  //   comment
  // });

  try {
    const post = await Post.findById(id);
    if(!post) return res.status(404).send({result : "failure", msg : "실패"});
    post.update({comment});
    post.save();
    return res.status(200).send({result : "성공", msg : "성공!!"});
  } catch (error) {
    console.log(error);
  }
});

