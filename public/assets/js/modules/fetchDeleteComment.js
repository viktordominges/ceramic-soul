import { fetchShowCommentsByPost } from "./fetchShowCommentsByPost.js";

export function fetchDeleteComment(slug, renderCommentFn, showEmptyMessageFn) {
    document.querySelectorAll('.delete-comment-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const commentId = e.target.dataset.id;

            if (confirm('Delete comment?')) {
                const response = await fetch(`/api/comments/${commentId}/delete`, {
                    method: 'DELETE',
                    credentials: 'include',
                });

                const result = await response.json();

                if (result.success) {
                    const commentsWrapper = document.querySelector('.comments-list__wrapper');

                    fetchShowCommentsByPost(slug, commentsWrapper, renderCommentFn, showEmptyMessageFn);
                } else {
                    alert(result.error || 'Error deleting comment');
                }
            }
        });
    });
}