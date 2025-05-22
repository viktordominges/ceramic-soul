export async function fetchShowPostsByCategory(name, postsWrapper, renderPost, showEmptyMessageFn, categoryNameSpan) {
    try {
        const response = await fetch(`/api/posts/category/${encodeURIComponent(name)}`);
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.status}`);
        }

        const data = await response.json();
        const posts = Array.isArray(data) ? data : data.content;

        // Установка имени категории, если передан соответствующий элемент
        if (categoryNameSpan) {
            const categoryName = posts[0]?.category || 'Неизвестная категория';
            categoryNameSpan.textContent = categoryName;
        }

        if (Array.isArray(posts) && posts.length) {
            posts.forEach(post => postsWrapper.appendChild(renderPost(post)));
        } else {
            showEmptyMessageFn(postsWrapper, 'Постов в данной категории пока нет.');
        }
    } catch (error) {
        console.error('Ошибка загрузки постов по категории:', error);
        showEmptyMessageFn(postsWrapper, 'Ошибка загрузки постов по категории.');
    }
}
