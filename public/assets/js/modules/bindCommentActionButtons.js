import { fetchCommentsByPost } from "./fetchCommentsByPost.js";

export function bindCommentActionButtons(slug) {
    
    // === Обработка удаления комментария ===
    document.querySelectorAll('.delete-comment-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const commentId = e.target.dataset.id;
            if (confirm('Удалить комментарий?')) {
                const response = await fetch(`/api/comments/${commentId}/delete`, {
                    method: 'DELETE'
                });

                const result = await response.json();

                if (result.success) {
                    const commentsWrapper = document.querySelector('.comments-list__wrapper'); // <- здесь исправлено
                    fetchCommentsByPost(slug, commentsWrapper);
                } else {
                    alert(result.error || 'Ошибка при удалении комментария');
                }
            }
        });
    });


    // === Обработка редактирования комментария ===
    document.querySelectorAll('.edit-comment-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const commentId = e.target.dataset.id;
            const commentElement = e.target.closest('.comment__item');
            const textElement = commentElement.querySelector('p');

            const originalText = textElement.textContent;

            // Создаем поле ввода
            const textarea = document.createElement('textarea');
            textarea.value = originalText;
            textarea.style.width = '100%';

            // Кнопки "Сохранить" и "Отмена"
            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Сохранить';
            saveBtn.classList.add('save-edit-btn');

            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Отмена';
            cancelBtn.classList.add('cancel-edit-btn');

            // Заменяем содержимое
            textElement.replaceWith(textarea);
            button.style.display = 'none'; // скрыть кнопку "редактировать"
            commentElement.appendChild(saveBtn);
            commentElement.appendChild(cancelBtn);

            cancelBtn.addEventListener('click', () => {
                textarea.replaceWith(textElement); // вернуть старый текст
                button.style.display = ''; // показать кнопку редактирования
                saveBtn.remove();
                cancelBtn.remove();
            });

            saveBtn.addEventListener('click', async () => {
                const updatedText = textarea.value.trim();
                if (!updatedText) {
                    alert('Текст не может быть пустым');
                    return;
                }

                const response = await fetch(`/api/comments/${commentId}/update`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text: updatedText })
                });

                const result = await response.json();

                if (result.success) {

                    const commentsWrapper = document.querySelector('.comments-list__wrapper');
                    fetchCommentsByPost(slug, commentsWrapper);
                } else {
                    alert(result.error || 'Ошибка при обновлении комментария');
                }
            });
        });
    });
}

