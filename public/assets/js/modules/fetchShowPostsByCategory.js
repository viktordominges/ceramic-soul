export async function fetchShowPostsByCategory(
    id, 
    postsWrapper,
    renderPost,
    showEmptyMessageFn,
    categoryNameSpan
) {
    try {
        const response = await fetch(`/api/posts/category/${encodeURIComponent(id)}`);
        if (!response.ok) {
            throw new Error(`Loading error: ${response.status}`);
        }

        const data = await response.json();
        const posts = Array.isArray(data.posts) ? data.posts : [];

        // Установка имени категории, если передан соответствующий элемент
        if (categoryNameSpan) {
            categoryNameSpan.textContent = data.category || 'Unknown category';
        }

        postsWrapper.innerHTML = '';

        if (posts.length) {
            posts.forEach(post => {
                const postElement = renderPost(post);
                postsWrapper.appendChild(postElement);
            });
        } else {
            showEmptyMessageFn(postsWrapper, 'There are no posts in this category yet.');
        }

    } catch (error) {
        console.error('Error loading posts by category:', error);
        postsWrapper.innerHTML = '';
        showEmptyMessageFn(postsWrapper, 'Error loading posts by category.');
    }
}

