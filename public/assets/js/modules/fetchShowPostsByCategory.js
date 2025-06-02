export async function fetchShowPostsByCategory(id, postsWrapper, renderPost, showEmptyMessageFn, categoryNameSpan) {
    try {
        const response = await fetch(`/api/posts/category/${encodeURIComponent(id)}`);
        if (!response.ok) {
            throw new Error(`Loading error: ${response.status}`);
        }

        const data = await response.json();
        const posts = Array.isArray(data) ? data : data.content;

        // Установка имени категории, если передан соответствующий элемент
        if (categoryNameSpan) {
            const categoryName = posts[0]?.category || 'Unknown category';
            categoryNameSpan.textContent = categoryName;
        }

        if (Array.isArray(posts) && posts.length) {
            posts.forEach(post => postsWrapper.appendChild(renderPost(post)));
        } else {
            showEmptyMessageFn(postsWrapper, 'There are no posts in this category yet..');
        }
    } catch (error) {
        console.error('Error loading posts by category:', error);
        showEmptyMessageFn(postsWrapper, 'Error loading posts by category.');
    }
}
