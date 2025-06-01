export async function fetchShowPostById(postId, singlePostWrapper, renderItemFn, showEmptyMessageFn) {
    try {
        const response = await fetch(`/api/posts/id/${encodeURIComponent(postId)}`);
        if (!response.ok) {
            throw new Error(`Loading error: ${response.status}`);
        }

        const post = await response.json();

        if (post) {
            singlePostWrapper.appendChild(renderItemFn(post));
        } else {
            showEmptyMessageFn(singlePostWrapper, 'Post not found.');
        }
    } catch (error) {
        console.error('Error loading post by ID:', error);
        showEmptyMessageFn(singlePostWrapper, 'Error loading post by ID.');
    }
}