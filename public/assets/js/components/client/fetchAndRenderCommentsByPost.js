
import { renderPostComment } from "./renderPostComment.js";
import { showEmptyMessage } from "./showEmptyMessage.js";

export async function fetchAndRenderCommentsByPost(slug, commentsListWrapper) {
    try {
        const response = await fetch(`/api/comments/post/${encodeURIComponent(slug)}`);

        if (!response.ok) {
            throw new Error(`Ошибка загрузки комментариев поста: ${response.status}`);
        }

        const data = await response.json();
        console.log('Parsed JSON data:', data);

        const comments = Array.isArray(data) ? data : data.content;

        commentsListWrapper.innerHTML = '';

        if (Array.isArray(comments) && comments.length) {
            // Добавляем комментарии так, чтобы последние шли вверху
            comments.slice().reverse().forEach(comment => {
                commentsListWrapper.appendChild(renderPostComment(comment));
            });
        } else {
            showEmptyMessage(commentsListWrapper, 'Комментариев пока нет.');
        }
    } catch (error) {
        console.error('Ошибка загрузки комментариев поста:', error);
        commentsListWrapper.innerHTML = '';
        showEmptyMessage(commentsListWrapper, 'Ошибка загрузки комментариев.');
    }
}
