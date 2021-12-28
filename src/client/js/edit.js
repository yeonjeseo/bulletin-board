const updateBtn = document.getElementById("submitUpdate");
const deleteBtn = document.getElementById("submitDelete");

const id = document.getElementById("postId").dataset.id;

const handleUpdateSubmit = async () => {
  //템플릿에서 데이터 가져오기
  const title = document.getElementById("input-title").value;
  const author = document.getElementById("input-author").value;
  const text = document.getElementById("input-comment").value;
  const password = document.getElementById("input-password").value;

  if (password === "") {
    window.alert("비밀번호를 입력해주세요!");
    return;
  }

  const updatedPost = {
    title,
    author,
    text,
    password,
  };

  const response = await fetch(`/api/postings/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },

    body: JSON.stringify(updatedPost),
  });

  window.alert((await response.json()).msg);
  location.href = "/";
  // if (response.status === 400) {
  //   window.alert((await response.json()).msg);
  // } else {
  //   window.alert((await response.json()).msg);
  //   location.reload();
  // }
};

const handleDeleteSubmit = async () => {
  const password = document.getElementById("input-password").value;
  const response = await fetch(`/api/postings/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      password,
    }),
  });

  const result = await response.json();
  window.alert(result.msg);
  location.href = "/";

  // if (response.status === 200) {
  // } else {
  //   return;
  // }
};

updateBtn.addEventListener("click", handleUpdateSubmit);
deleteBtn.addEventListener("click", handleDeleteSubmit);
