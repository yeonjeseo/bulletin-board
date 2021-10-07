const getUser = async () => {
  const response = await fetch("/api/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.status === 400) {
    window.alert("로그인이 필요합니다.");
    location.href = "/login";
  }
};

window.addEventListener("DOMContentLoaded", getUser);
