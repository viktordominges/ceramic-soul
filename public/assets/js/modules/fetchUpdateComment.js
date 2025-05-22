import { fetchShowCommentsByPost } from "./fetchShowCommentsByPost.js";

export function fetchUpdateComment(slug) {

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
            saveBtn.textContent = 'Сохранить';
            saveBtn.classList.add('save-edit-btn');

            // Создаем кнопку отмены
            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Отмена';
            cancelBtn.classList.add('cancel-edit-btn');

            // Заменяем содержимое текста на поле ввода
            textElement.replaceWith(textarea);
            button.style.display = 'none'; // скрыть кнопку "редактировать"
            commentElement.appendChild(saveBtn);
            commentElement.appendChild(cancelBtn);

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

                    // Обновляем содержимое комментариев
                    fetchShowCommentsByPost(slug, commentsWrapper);

                } else {
                    alert(result.error || 'Ошибка при обновлении комментария');
                }
            });
        });
    });
}

