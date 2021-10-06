const commentBtn = document.getElementById("submitComment");
const deleteCommentBtns = document.querySelectorAll(".comment-delete");

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

deleteCommentBtns.forEach((btn) =>
  btn.addEventListener("click", handleDeleteComment)
);

// window.addEventListener("DOMContentLoaded", getUser);
commentBtn.addEventListener("click", handleSubmitComment);
