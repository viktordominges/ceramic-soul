import { adminRenderPost } from '../components/admin/adminRenderPost.js';
import { showEmptyMessage } from '../components/client/showEmptyMessage.js';

export async function adminFetchShowPosts(postsWrapper) {
    try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
            throw new Error(`Loading error: ${response.status}`);
        }

        const posts = await response.json();

        if (Array.isArray(posts) && posts.length) {
            posts.forEach(post => {
                postsWrapper.appendChild(adminRenderPost(post));
            });
        } else {
            showEmptyMessage(postsWrapper, 'There are no posts yet.');
        }
    } catch (error) {
        console.error('Error loading posts:', error);
        showEmptyMessage(postsWrapper, 'Error loading posts.');
    }
}
