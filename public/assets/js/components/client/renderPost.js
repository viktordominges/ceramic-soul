export function renderPost(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post-item');

    // Базовый HTML, общий для всех постов
    let postHTML = `
        <img src="${post.image}" alt="${post.title}" class="post-image" />
        <div class="post-header">
            <h2>${post.title}</h2>
            <a class="read-more" href="/post/${post.slug}">Read</a>
        </div>
        <p class="post-content">${post.content}</p>
        <div class="category-down-post__wrapper">
            <img src="assets/images/icons/gold-star.png" alt="star" class="category-down-post__img" />
            <p class="category-down-post__name">${post.category ?? 'Без категории'}</p>
        </div>
    `;

    // Добавляем дату создания
    // postHTML += `<span class="post-date">Created at: ${new Date(post.created_at).toLocaleDateString()}</span>`;

    // Добавляем дату обновления, если она есть и отличается от даты создания
    // if (post.updated_at && post.updated_at !== 'null' && post.updated_at !== post.created_at) {
    //     postHTML += `<span class="post-date">Updated at: ${new Date(post.updated_at).toLocaleDateString()}</span>`;
    // }

    postElement.innerHTML = postHTML;

    return postElement;
}
