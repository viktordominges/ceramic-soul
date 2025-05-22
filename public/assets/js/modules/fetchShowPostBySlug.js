export async function fetchShowPostBySlug(slug, singlePostWrapper, renderSinglePost, showEmptyMessageFn) {
    try {
        const response = await fetch(`/api/posts/post/${encodeURIComponent(slug)}`);
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.status}`);
        }

        const post = await response.json();

        if (post) {
            singlePostWrapper.appendChild(renderSinglePost(post));
        } else {
            showEmptyMessageFn(singlePostWrapper, 'Пост не найден.');
        }
    } catch (error) {
        console.error('Ошибка загрузки поста по слагу:', error);
        showEmptyMessageFn(singlePostWrapper, 'Ошибка загрузки поста.');
    }
}
