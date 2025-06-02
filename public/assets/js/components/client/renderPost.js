export function renderPost(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post__item');

    // Базовый HTML, общий для всех постов
    let postHTML = `
        <img src="${post.image || 'assets/images/placeholders/ceramic-vase.jpg'}" alt="${post.title}" class="post__item_image" />
        <div class="post__item_header">
            <h2>${post.title}</h2>
            <a class="read-more" href="/post?id=${encodeURIComponent(post.id)}">Read</a>
        </div>
        <p class="post__item_description">${post.description}</p>
        <div class="category-name__wrapper post__item-down">
            <img src="assets/images/icons/gold-star.png" alt="star" />
            <a href="/category?id=${encodeURIComponent(post.category_id)}">${post.category ?? 'Без категории'}</a>
        </div>
    `;

    postElement.innerHTML = postHTML;

    return postElement;
}
