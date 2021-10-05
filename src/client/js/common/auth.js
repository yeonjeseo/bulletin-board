// function getSelf(callback) {
//   $.ajax({
//     type: "GET",
//     url: "/api/users/me",
//     headers: {
//       authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//     success: function (response) {
//       console.log(response);
//       callback(response);
//     },
//     error: function (xhr, status, error) {
//       if (status == 401) {
//         alert("로그인이 필요합니다.");
//       } else {
//         localStorage.clear();
//         alert("알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.");
//       }
//       window.location.href = "/";
//     },
//   });
// }

export const getSelf = async () => {
  const response = await fetch("url", {
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
