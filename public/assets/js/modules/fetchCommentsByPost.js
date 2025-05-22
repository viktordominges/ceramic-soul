
import { renderPostComment } from "../components/client/renderPostComment.js";
import { showEmptyMessage } from "../components/client/showEmptyMessage.js";
import { bindCommentActionButtons } from "../modules/bindCommentActionButtons.js";

export async function fetchCommentsByPost(slug, commentsListWrapper) {
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
            bindCommentActionButtons(slug);
        } else {
            showEmptyMessage(commentsListWrapper, 'Комментариев пока нет.');
        }
    } catch (error) {
        console.error('Ошибка загрузки комментариев поста:', error);
        commentsListWrapper.innerHTML = '';
        showEmptyMessage(commentsListWrapper, 'Ошибка загрузки комментариев.');
    }
}
