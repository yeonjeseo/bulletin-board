const handleLoadContent = async () => {
  const parentNode = document.getElementById("postContainer");

  const response = await fetch("/postings", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // console.log(await response.json());

  const comments = (await response.json()).comments;
  let html = "";
  comments.forEach((comment) => {
    html += `
    <div class="col-md-4 card__container">
    <div class="card">
        <div class="card-block">
            <h4 class="card-title">${comment.title}</h4>
            <h6 class="card-subtitle text-muted">${comment.author}</h6>
            <span class="card-subtitle text-muted">${comment.createdAt}</span>
            <p class="card-text p-y-1">${comment.comment}</p>
            <a href="/comments/${comment._id}/detail" class="card-link">상세페이지</a>
            <a href="/comments/${comment._id}/edit" class="card-link">편집하기</a>
        </div>
    </div>
</div>
    `;
  });
  parentNode.innerHTML = html;
};
window.addEventListener("DOMContentLoaded", handleLoadContent);
