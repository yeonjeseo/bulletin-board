const btnSubmit = document.getElementById("signup");

const handleSubmit = (e) => {
  const username = document.getElementById("input-username").value;
  const email = document.getElementById("input-email").value;
  const password = document.getElementById("input-password").value;
  const confirmPassword = document.getElementById("input-confirm").value;
};

btnSubmit.addEventListener("click", handleSubmit);
