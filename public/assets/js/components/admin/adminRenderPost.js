export function adminRenderPost(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('posts-list__item');

    // Базовый HTML, общий для всех постов
    let postHTML = `
        <span>${post.id}</span>
        <span>${post.category}</span>
        <span>${post.title}</span>
        <span data-post-id="${post.id}" data-post-slug="${post.slug}" class="details__btn">Details</span>
    `;

    postElement.innerHTML = postHTML;

    return postElement;
}