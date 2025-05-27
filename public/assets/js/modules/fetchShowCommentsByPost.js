
import { renderPostComment } from "../components/client/renderPostComment.js";
import { showEmptyMessage } from "../components/client/showEmptyMessage.js";
import { fetchDeleteComment } from "./fetchDeleteComment.js";
import { fetchUpdateComment } from "./fetchUpdateComment.js";

export async function fetchShowCommentsByPost(slug, commentsListWrapper) {
    try {
        const response = await fetch(`/api/comments/post/${encodeURIComponent(slug)}`);

        if (!response.ok) {
            throw new Error(`Error loading post comments: ${response.status}`);
        }

        const data = await response.json();

        console.log('Comments:', data);
        

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
            showEmptyMessage(commentsListWrapper, 'There are no comments yet.');
        }
    } catch (error) {
        console.error('Error loading post comments:', error);
        commentsListWrapper.innerHTML = '';
        showEmptyMessage(commentsListWrapper, 'Error loading post comments.');
    }
}
