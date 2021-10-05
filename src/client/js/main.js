const handleLoadContent = async () => {
  const parentNode = document.getElementById("postContainer");

  const response = await fetch("/api/postings", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { postings } = await response.json();
  let html = "";
  postings.forEach((posting) => {
    html += `
    <div class="col-md-4 card__container">
    <div class="card">
        <div class="card-block">
            <h4 class="card-title">${posting.title}</h4>
            <h6 class="card-subtitle text-muted">${posting.author}</h6>
            <span class="card-subtitle text-muted">${posting.createdAt}</span>
            <p class="card-text p-y-1">${posting.text}</p>
            <a href="/postings/${posting._id}/detail" class="card-link">상세페이지</a>
            <a href="/postings/${posting._id}/edit" class="card-link">편집하기</a>
        </div>
    </div>
</div>
    `;
  });
  parentNode.innerHTML = html;
};
window.addEventListener("DOMContentLoaded", handleLoadContent);
