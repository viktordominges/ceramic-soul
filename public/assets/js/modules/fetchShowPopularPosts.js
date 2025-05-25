import { renderPopularPostsTitles } from '../components/client/renderPopularPostsTitles.js';
import { showEmptyMessage } from '../components/client/showEmptyMessage.js';

export async function fetchShowPopularPosts(popularPostsWrapper) {
    try {
        const response = await fetch('/api/posts/popular');
        if (!response.ok) {
            throw new Error(`Loading error: ${response.status}`);
        }

        const posts = await response.json();
       
        if (Array.isArray(posts) && posts.length) {
            posts.forEach(post => {
                popularPostsWrapper.appendChild(renderPopularPostsTitles(post));
            });
        } else {
            showEmptyMessage(popularPostsWrapper, 'There are no popular posts yet.');
        }
    } catch (error) {
        console.error('Error loading popular posts:', error);
        showEmptyMessage(popularPostsWrapper, 'Error loading popular posts.');
    }
}
