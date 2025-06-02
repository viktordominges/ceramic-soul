import { fetchShowCommentsByPost } from './fetchShowCommentsByPost.js';
import { fetchShowCommentsByUser } from './fetchShowCommentsByUser.js';

export function fetchDeleteComment({ contextId, contextType = 'post', renderFn, showEmptyFn }) {
    document.querySelectorAll('.delete-comment-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const commentId = e.target.dataset.id;

            if (!commentId) return;

            if (confirm('Delete comment?')) {
                try {
                    const response = await fetch(`/api/comments/${commentId}/delete`, {
                        method: 'DELETE',
                        credentials: 'include',
                    });

                    const result = await response.json();

                    if (result.success) {
                        const commentsWrapper = document.querySelector('.comments-list__wrapper');

                        if (contextType === 'post') {
                            fetchShowCommentsByPost(contextId, commentsWrapper, renderFn, showEmptyFn);
                        } else if (contextType === 'user') {
                            fetchShowCommentsByUser(contextId, commentsWrapper, renderFn, showEmptyFn);
                        }

                    } else {
                        alert(result.error || 'Error deleting comment');
                    }
                } catch (error) {
                    console.error('Delete comment error:', error);
                    alert('Server error while deleting comment');
                }
            }
        });
    });
}
