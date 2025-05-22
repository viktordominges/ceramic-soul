import { renderPopularPostsTitles } from '../components/client/renderPopularPostsTitles.js';
import { showEmptyMessage } from '../components/client/showEmptyMessage.js';

export async function fetchShowPopularPosts(popularPostsWrapper) {
    try {
        const response = await fetch('/api/posts/popular');
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.status}`);
        }

        const posts = await response.json();
       
        if (Array.isArray(posts) && posts.length) {
            posts.forEach(post => {
                popularPostsWrapper.appendChild(renderPopularPostsTitles(post));
            });
        } else {
            showEmptyMessage(popularPostsWrapper, 'Популярных постов пока нет.');
        }
    } catch (error) {
        console.error('Ошибка загрузки постов:', error);
        showEmptyMessage(popularPostsWrapper, 'Ошибка загрузки популярных постов.');
    }
}
