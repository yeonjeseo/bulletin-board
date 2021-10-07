const btnSubmit = document.getElementById("create");
const titleInput = document.getElementById("input-title");
const textInput = document.getElementById("input-comment");
const passwordInput = document.getElementById("input-password");

const handleSubmit = async (e) => {
  const title = titleInput.value;
  const text = textInput.value;
  const password = passwordInput.value;

  if (title !== "" && text !== "" && password !== "") {
    const commentObj = {
      title,
      text,
      password,
    };
    const response = await fetch("/api/postings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(commentObj),
    });

    const result = await response.json();
    // 만약 정상적으로 끝나면... 조건 추가할 것
    if (response.status === 200) {
      window.alert("제출이 완료되었습니다.");
      location.href = "/";
    } else {
      window.alert(result.msg);
    }
  } else {
    window.alert("모든 양식을 작성해주세요");
  }
};

btnSubmit.addEventListener("click", handleSubmit);
