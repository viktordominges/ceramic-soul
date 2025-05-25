import { renderPost } from '../components/client/renderPost.js';
import { showEmptyMessage } from '../components/client/showEmptyMessage.js';

export async function fetchShowPosts(postsWrapper) {
    try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
            throw new Error(`Loading error: ${response.status}`);
        }

        const posts = await response.json();
        console.log('Posts:', posts);

        if (Array.isArray(posts) && posts.length) {
            posts.forEach(post => {
                postsWrapper.appendChild(renderPost(post));
            });
        } else {
            showEmptyMessage(postsWrapper, 'There are no posts yet.');
        }
    } catch (error) {
        console.error('Error loading posts:', error);
        showEmptyMessage(postsWrapper, 'Error loading posts.');
    }
}
