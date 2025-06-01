export function renderPopularPostsTitles(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('popular-post__item');

    // Базовый HTML, общий для всех постов
    let postHTML = `
        <img src="${post.image ? `/${post.image}` : '/assets/images/placeholders/ceramic-vase.jpg'}" alt="${post.title}" />
        <div>  
            <a href="/post?id=${encodeURIComponent(post.id)}">${post.title}</a>
            <span class="popular-post__comments-count">
                ${post.comments_count} ${post.comments_count === 1 ? 'comment' : 'comments'}
            </span> 
        </div>
    `;

    postElement.innerHTML = postHTML;

    return postElement;
}