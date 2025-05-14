export function renderSinglePost(post) {
    const singlePost = document.createElement('div');
    singlePost.classList.add('post__item');

    // Базовый HTML, общий для всех постов
    let postHTML = `
        <img src="${post.image}" alt="${post.title}" class="post__item_image" />
        <div class="post__item_header">
            <h2>${post.title}</h2>
            <a class="read-more" href="/post?slug=${encodeURIComponent(post.slug)}">Read</a>
        </div>
        <p class="post__item_content">${post.description}</p>
        <div class="post__item-down_wrapper">
            <img src="assets/images/icons/gold-star.png" alt="star" class="post__item-down_img" />
            <p class="post__item-down_name">${post.category ?? 'Без категории'}</p>
        </div>
    `;

    // Добавляем дату создания
    postHTML += `<span class="post-date">Created at: ${new Date(post.created_at).toLocaleDateString()}</span>`;

    // Добавляем дату обновления, если она есть и отличается от даты создания
    if (post.updated_at && post.updated_at !== 'null' && post.updated_at !== post.created_at) {
        postHTML += `<span class="post-date">Updated at: ${new Date(post.updated_at).toLocaleDateString()}</span>`;
    }

    singlePost.innerHTML = postHTML;

    return singlePost;
}
