import { fetchShowCommentsByPost } from "./fetchShowCommentsByPost.js";
import { limitInputLengthWithCounter } from './helpers.js';
    
export function fetchCreateComment(postId, commentsListWrapper, renderCommentFn, showEmptyMessageFn) {
    const addCommentTrigger = document.querySelector('#add-comment-btn');

    if (!addCommentTrigger) return;

    // Применим ограничение длины
    const commentForm = document.querySelector('#add-comment-form');
    if (commentForm) {
        limitInputLengthWithCounter(commentForm, {
            'comment': 490, // если name="comment", иначе используй имя поля
        });
    }

    addCommentTrigger.addEventListener('click', async (e) => {
        e.preventDefault();

        const postElement = document.querySelector('.single-post__item');
        if (!postElement) return;

        const commentText = document.querySelector('#comment-textarea')?.value.trim();

        if (!commentText) {
            alert('Comment cannot be empty');
            return;
        }

        try {
            const response = await fetch('/api/comments/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ post_id: postId, text: commentText }),
            });

            const data = await response.json();

            if (data.error) {
                alert('Ошибка: ' + data.error);
                console.error('Ошибка:', data.error);
                return;
            }

            alert('Comment added!');
            document.querySelector('#comment-textarea').value = '';

            // Обновляем список комментариев с нужным рендером
            await fetchShowCommentsByPost(postId, commentsListWrapper, renderCommentFn, showEmptyMessageFn);

        } catch (error) {
            console.error('Request error:', error);
            alert('There was an error sending your comment. Please try again.');
        }
    });
}