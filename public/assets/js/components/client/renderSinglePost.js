export function renderSinglePost(post) {
    const singlePost = document.createElement('div');
    singlePost.classList.add('single-post__item');

    // Базовый HTML, общий для всех постов
    let postHTML = `
        <img src="${post.image}" alt="${post.title}" />
        <h1>${post.title}</h1>
        <div class="single-post__info_wrapper">
            <div class="category-name__wrapper">
                <img src="assets/images/icons/gold-star.png" alt="star" />
                <a href="/category?name=${encodeURIComponent(post.category)}">${post.category ?? 'Без категории'}</a>
            </div>
            <span class="single-post__date">${new Date(post.created_at).toLocaleDateString()}</span>
            <span class="single-post__comments-count">5 comments</span>
        </div>
        <p class="single-post__text">${post.text}</p>
        <div class="leave-comment__wrapper">
            <img src="assets/images/icons/comment.svg" alt="comment" />
            <a href="#">Leave a comment</a>
        </div>
    `;

    // Добавляем дату обновления, если она есть и отличается от даты создания
    // if (post.updated_at && post.updated_at !== 'null' && post.updated_at !== post.created_at) {
    //     postHTML += `<span class="post-date">Updated at: ${new Date(post.updated_at).toLocaleDateString()}</span>`;
    // }

    singlePost.innerHTML = postHTML;

    return singlePost;
}
