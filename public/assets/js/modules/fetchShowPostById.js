export async function fetchShowPostById(postId, singlePostWrapper, renderItemFn, showEmptyMessageFn) {
    try {
        const response = await fetch(`/api/posts/id/${encodeURIComponent(postId)}`);

        console.log(`Fetching post by ID: ${postId} ` );
        console.log(response);
        

        if (!response.ok) {
            throw new Error(`Loading error: ${response.status}`);
        }

        const post = await response.json();


        console.log('Post data:', post);

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
