const btnSubmit = document.getElementById("login");

const handleSubmit = async (e) => {
  const email = document.getElementById("input-email").value;
  const password = document.getElementById("input-password").value;

  const user = { email, password };
  const response = await fetch("/api/users/auth", {
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

const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (token) {
    window.alert("이미 로그인 되어있습니다. 메인 페이지로 이동합니다.");
    location.href = "/";
  }
};
window.addEventListener("DOMContentLoaded", isLoggedIn);
btnSubmit.addEventListener("click", handleSubmit);
