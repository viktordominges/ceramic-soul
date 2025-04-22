export function renderPost(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post-item');

    if (!post.updated_at || post.updated_at === 'null' || post.updated_at === post.created_at) {
        postElement.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="post-image" />
        <h2>${post.title}</h2>
        <p class="post-content">${post.content}</p>
        <a class="read-more" href="/post/${post.slug}">Read more</a>
        <span class="post-date">Created at: ${new Date(post.created_at).toLocaleDateString()}</span>
        <p class="post-category">${post.category ?? 'Без категории'}</p>
    `;
    } else {
        postElement.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="post-image" />
        <h2>${post.title}</h2>
        <p class="post-content">${post.content}</p>
        <a class="read-more" href="/post/${post.slug}">Read more</a>
        <span class="post-date">Created at: ${new Date(post.created_at).toLocaleDateString()}</span>
        <span class="post-date">Updated at: ${post.updated_at ? new Date(post.updated_at).toLocaleDateString() : '—'}</span>
        <p class="post-category">${post.category ?? 'Без категории'}</p>
    `;
    }

    return postElement;
}
