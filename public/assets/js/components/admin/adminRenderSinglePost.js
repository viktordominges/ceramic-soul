export function adminRenderSinglePost(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post-info__wrapper');

    // Базовый HTML, общий для всех постов
    let postHTML = `
        <div class="post-info__item">
            <h3 class="post-info__title">Post ID:</h3>
            <span class="post-info__info">${post.id}</span>
        </div>

        <div class="post-info__item">
            <h3 class="post-info__title">Post Category:</h3>
            <span class="post-info__info">${post.category ?? 'Without category'}</span>
        </div>

        <div class="post-info__item">
            <h3 class="post-info__title">Post Title:</h3>
            <span class="bold post-info__info">${post.title}</span>
        </div>

        <div class="post-info__item">
            <h3 class="post-info__title">Post Description:</h3>
            <span class="post-info__info">${post.description}</span>
        </div>

        <div class="post-info__item">
            <h3 class="post-info__title">Post Text:</h3>
            <span class="post-info__info">${post.text}</span>
        </div>

        <div class="post-info__item">
            <h3 class="post-info__title">Post Image:</h3>
            <span class="post-info__info">
                ${post.image
                    ? `<img src="/../${post.image}" alt="Post image" />`
                    : 'Without image (template used)'}
            </span>
        </div>

        <div class="post-info__item">
            <h3 class="post-info__title">Post Created Date:</h3>
            <span class="post-info__info">${post.created_at}</span>
        </div>

        <div class="post-info__item">
            <h3 class="post-info__title">Post Updated Date:</h3>
            <span class="post-info__info">${post.updated_at || 'Not updated'}</span>
        </div>

        <div class="post-info__item">
            <h3 class="post-info__title">Comments Count:</h3>
            <span class="post-info__info">${post.comments_count}</span>
        </div>
    `;

    postElement.innerHTML = postHTML;

    return postElement;
}