import { fetchAndRenderCommentsByPost } from "./fetchAndRenderCommentsByPost.js";
    
export function fetchCreateComment(slug, commentsListWrapper) {

    const addCommentTrigger = document.querySelector('#add-comment-btn');

    addCommentTrigger.addEventListener('click', async (e) => {
        e.preventDefault();

        // Получаем id поста из дата-атрибута
        const postElement = document.querySelector('.single-post__item');
        const postId = parseInt(postElement.dataset.postId, 10); // обязательно число

        // Получаем текст комментария
        const commentText = document.querySelector('#comment-textarea').value.trim();

        if (!commentText) {
            alert('Комментарий не может быть пустым');
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

            alert('Комментарий добавлен!');
            document.querySelector('#comment-textarea').value = '';

            // Обновляем список комментариев после успешной отправки
            await fetchAndRenderCommentsByPost(slug, commentsListWrapper);

        } catch (error) {
            console.error('Ошибка запроса:', error);
            alert('Произошла ошибка при отправке комментария');
        }
    });

}