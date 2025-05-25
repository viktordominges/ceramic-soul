export async function fetchShowPostBySlug(slug, singlePostWrapper, renderSinglePost, showEmptyMessageFn) {
    try {
        const response = await fetch(`/api/posts/post/${encodeURIComponent(slug)}`);
        if (!response.ok) {
            throw new Error(`Loading error: ${response.status}`);
        }

        const post = await response.json();

        if (post) {
            singlePostWrapper.appendChild(renderSinglePost(post));
        } else {
            showEmptyMessageFn(singlePostWrapper, 'Post not found.');
        }
    } catch (error) {
        console.error('Error loading post by slug:', error);
        showEmptyMessageFn(singlePostWrapper, 'Error loading post by slug.');
    }
}
