// import { showEmptyMessage } from "../components/client/showEmptyMessage.js";
import { fetchDeleteComment } from "./fetchDeleteComment.js";

export async function fetchShowCommentsByUser(userId, commentsListWrapper, renderItemFn, showEmptyMessageFn) {
    try {
        const response = await fetch(`/api/comments/user/${encodeURIComponent(userId)}`);

        if (!response.ok) {
            throw new Error(`Error loading user comments: ${response.status}`);
        }

        const data = await response.json();

        const comments = Array.isArray(data) ? data : data.content;

        commentsListWrapper.innerHTML = '';

        if (Array.isArray(comments) && comments.length) {
            // Рендерим комментарии (последние — первыми)
            comments.slice().reverse().forEach(comment => {
                commentsListWrapper.appendChild(renderItemFn(comment));
            });

            // Устанавливаем обработчики удаления
            fetchDeleteComment({
                contextId: userId,
                contextType: 'user',
                renderFn: renderItemFn, // используем тот же рендер-функционал
                showEmptyFn: showEmptyMessageFn
            });

        } else {
            showEmptyMessageFn(commentsListWrapper, 'There are no comments yet.');
        }
    } catch (error) {
        console.error('Error loading user comments:', error);
        commentsListWrapper.innerHTML = '';
        showEmptyMessageFn(commentsListWrapper, 'Error loading user comments.');
    }
}
