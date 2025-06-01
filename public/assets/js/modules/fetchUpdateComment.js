import { fetchShowCommentsByPost } from "./fetchShowCommentsByPost.js";
import { renderPostComment } from "../components/client/renderPostComment.js";
import { showEmptyMessage } from "../components/client/showEmptyMessage.js";

export function fetchUpdateComment(postId) {

    // === Обработка редактирования комментария ===
    document.querySelectorAll('.edit-comment-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            // Получаем id комментария
            const commentId = e.target.dataset.id;
            // Получаем элемент комментария
            const commentElement = e.target.closest('.comment__item');
            const textElement = commentElement.querySelector('p');

            // Получаем текст комментария
            const originalText = textElement.textContent;

            // Создаем поле ввода
            const textarea = document.createElement('textarea');
            textarea.value = originalText;
            textarea.style.width = '100%';

            // Создаем кнопку сохранения
            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.classList.add('save-edit-btn');

            // Создаем кнопку отмены
            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Cancel';
            cancelBtn.classList.add('cancel-edit-btn');

            // Заменяем содержимое текста на поле ввода
            textElement.replaceWith(textarea);
            button.style.display = 'none'; // скрыть кнопку "редактировать"
            commentElement.querySelector('.comment__actions').appendChild(saveBtn);
            commentElement.querySelector('.comment__actions').appendChild(cancelBtn);

            // Обработка нажатия кнопки "отмена"
            cancelBtn.addEventListener('click', () => {
                textarea.replaceWith(textElement); // вернуть старый текст
                button.style.display = ''; // показать кнопку редактирования
                saveBtn.remove();
                cancelBtn.remove();
            });

            // Обработка нажатия кнопки "сохранить"
            saveBtn.addEventListener('click', async () => {
                const updatedText = textarea.value.trim();
                if (!updatedText) {
                    alert('Comment text cannot be empty');
                    return;
                }

                const response = await fetch(`/api/comments/${commentId}/update`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text: updatedText })
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error response:', errorText); // Логируем тело ответа
                    throw new Error(`Error updating post comments: ${response.status}`);
                }

                const result = await response.json();

                if (result.success) {
                    const commentsWrapper = document.querySelector('.comments-list__wrapper');

                    // Обновляем содержимое комментариев
                    fetchShowCommentsByPost(postId, commentsWrapper, renderPostComment, showEmptyMessage);

                } else {
                    alert(result.error || 'Error updating comment');
                }
            });
        });
    });
}

