export function adminRenderPost(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('posts-list__item');

    // Базовый HTML, общий для всех постов
    let postHTML = `
        <span>${post.id}</span>
        <span>${post.category}</span>
        <span>${post.title}</span>

        <a class="details__btn" href="/admin/post?id=${encodeURIComponent(post.id)}">Details</a>
    `;

    postElement.innerHTML = postHTML;

    return postElement;
}