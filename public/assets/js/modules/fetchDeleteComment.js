import { fetchShowCommentsByPost } from "./fetchShowCommentsByPost.js";

export function fetchDeleteComment(slug) {
     
    // === Обработка удаления комментария ===
    document.querySelectorAll('.delete-comment-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            // Получаем id комментария
            const commentId = e.target.dataset.id;

            if (confirm('Delete comment?')) {
                const response = await fetch(`/api/comments/${commentId}/delete`, {
                    method: 'DELETE'
                });

                const result = await response.json();

                if (result.success) {
                    const commentsWrapper = document.querySelector('.comments-list__wrapper');

                    // Обновляем список комментариев
                    fetchShowCommentsByPost(slug, commentsWrapper);

                } else {
                    alert(result.error || 'Error deleting comment');
                }
            }
        });
    });
}