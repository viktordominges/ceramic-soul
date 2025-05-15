export function renderPopularPostsTitles(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('popular-post__item');

    // Базовый HTML, общий для всех постов
    let postHTML = `
        <img src="${post.image}" alt="${post.title}" />
        <a href="/post?slug=${encodeURIComponent(post.slug)}">${post.title}</a>
    `;

    postElement.innerHTML = postHTML;

    return postElement;
}