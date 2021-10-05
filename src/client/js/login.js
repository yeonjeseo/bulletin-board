// import getSelf from "./static/js/common/auth.js";

const btnSubmit = document.getElementById("login");

const handleSubmit = async (e) => {
  const email = document.getElementById("input-email").value;
  const password = document.getElementById("input-password").value;

  const user = { email, password };
  const response = await fetch("/users/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const result = await response.json();

  if (response.status === 200) {
    localStorage.setItem("token", result.token);

    window.alert(result.msg);

    location.href = "/";
  } else {
    localStorage.clear();
    window.alert(result.msg);
  }
};

btnSubmit.addEventListener("click", handleSubmit);

console.log("여기는 로그인");
