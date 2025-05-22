
import { renderPostComment } from "../components/client/renderPostComment.js";
import { showEmptyMessage } from "../components/client/showEmptyMessage.js";
import { fetchDeleteComment } from "./fetchDeleteComment.js";
import { fetchUpdateComment } from "./fetchUpdateComment.js";

export async function fetchShowCommentsByPost(slug, commentsListWrapper) {
    try {
        const response = await fetch(`/api/comments/post/${encodeURIComponent(slug)}`);

        if (!response.ok) {
            throw new Error(`Ошибка загрузки комментариев поста: ${response.status}`);
        }

        const data = await response.json();

        const comments = Array.isArray(data) ? data : data.content;
        
        commentsListWrapper.innerHTML = '';

        if (Array.isArray(comments) && comments.length) {
            // Добавляем комментарии так, чтобы последние шли вверху
            comments.slice().reverse().forEach(comment => {
                commentsListWrapper.appendChild(renderPostComment(comment));
            });

            // Обработка удаления комментария (добавляем обработчики)
            fetchDeleteComment(slug);
            // Обработка редактирования комментария (добавляем обработчики)
            fetchUpdateComment(slug);

        } else {
            showEmptyMessage(commentsListWrapper, 'Комментариев пока нет.');
        }
    } catch (error) {
        console.error('Ошибка загрузки комментариев поста:', error);
        commentsListWrapper.innerHTML = '';
        showEmptyMessage(commentsListWrapper, 'Ошибка загрузки комментариев.');
    }
}
