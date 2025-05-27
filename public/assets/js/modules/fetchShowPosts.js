export async function fetchShowPosts({
    endpoint = '/api/posts',
    wrapper,
    renderItem,
    showEmptyMessageFn
}) {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Loading error: ${response.status}`);
        }

        const posts = await response.json();

        if (Array.isArray(posts) && posts.length) {
            posts.forEach(post => {
                wrapper.appendChild(renderItem(post));
            });
        } else {
            showEmptyMessageFn(wrapper, 'There are no posts yet.');
        }
    } catch (error) {
        console.error('Error loading posts:', error);
        showEmptyMessageFn(wrapper, 'Error loading posts.');
    }
}
