const commentBtn = document.getElementById("submitComment");

// get the posting ID from url
const url = window.location.pathname;
const postingId = url.split("/")[2];

const getUser = async () => {
  const response = await fetch("/users/me", {
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
  const response = await fetch(`/postings/${postingId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ text }),
  });

  const result = await response.json();
  window.alert(result.msg);
  window.location.reload();
};

window.addEventListener("DOMContentLoaded", getUser);
commentBtn.addEventListener("click", handleSubmitComment);
