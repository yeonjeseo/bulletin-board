const commentBtn = document.getElementById("submitComment");
const deleteCommentBtns = document.querySelectorAll(".comment-delete");
const editCommentBtns = document.querySelectorAll(".comment-edit");
const confirmEditBtns = document.querySelectorAll(".confirm-edit");

// get the posting ID from url
const url = window.location.pathname;
const postingId = url.split("/")[2];

const getUser = async () => {
  const response = await fetch("/api/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const result = await response.json();
  console.log(result);

  if (response.status === 400) {
    window.alert("로그인이 필요합니다.");
    location.href = "/login";
  }
};

const handleSubmitComment = async () => {
  // text 가져오기
  const text = document.getElementById("commentText").value;

  console.log(postingId);
  // 서버에 요청
  const response = await fetch(`/api/postings/${postingId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ text }),
  });

  const result = await response.json();
  if (response.status === 400) {
    window.alert(result.msg);
    location.href = "/login";
  } else {
    window.alert(result.msg);
    window.location.reload();
  }
};

const handleDeleteComment = async (event) => {
  const commentId = event.target.parentNode.dataset.commentid;

  const response = await fetch(`/api/postings/${postingId}/comments`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ commentId }),
  });

  const result = await response.json();
  window.alert(result.msg);
  location.reload();
};

const changeInputForm = () => {
  // 현재 댓글에 있는 텍스트를 임시로 저장
  let tempText = "DASDSA";
  //p 태그를 지우고,

  //textarea로 바꾸고

  //내용물을 tempTexp 바꿔주는
};

const handleEditComment = async (event) => {
  const text = event.target.previousSibling.previousSibling.value;
  const commentId =
    event.target.parentNode.nextSibling.nextSibling.dataset.commentid;

  const newComment = {
    text,
    commentId,
  };

  const response = await fetch(`/api/postings/${postingId}/comments`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(newComment),
  });

  const result = await response.json();
  if (response.status === 200) {
    window.alert(result.msg);
    location.reload();
  } else {
    window.alert(result.msg);
  }
};

commentBtn.addEventListener("click", handleSubmitComment);
deleteCommentBtns.forEach((btn) =>
  btn.addEventListener("click", handleDeleteComment)
);
window.addEventListener("DOMContentLoaded", getUser);
confirmEditBtns.forEach((btn) =>
  btn.addEventListener("click", handleEditComment)
);

// $(document).on("click", ".test1", function () {
// });
