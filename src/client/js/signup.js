const btnSubmit = document.getElementById("signup");

const handleSubmit = async (e) => {
  const username = document.getElementById("input-username").value;
  const email = document.getElementById("input-email").value;
  const password = document.getElementById("input-password").value;
  const confirmPassword = document.getElementById("input-confirm").value;

  const user = { username, email, password, confirmPassword };
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const result = await response.json();
  if (response.status === 200) {
    window.alert(result.msg);
    location.href = "/";
  } else {
    window.alert(result.msg);
  }
};

btnSubmit.addEventListener("click", handleSubmit);
