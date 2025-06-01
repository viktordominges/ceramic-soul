
import { updatePostWithPopup } from '../../modules/updatePostWithPopup.js';
import { deletePostById } from '../../modules/deletePostById.js';

export function adminRenderSinglePost(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post-info__wrapper');

    // Базовый HTML, общий для всех постов
    let postHTML = `
        <div class="post-info__item">
            <h3 class="post-info__title">Post ID:</h3>
            <span class="post-info__info">${post.id}</span>
        </div>

        <div class="post-info__item">
            <h3 class="post-info__title">Post Category:</h3>
            <span class="post-info__info">${post.category ?? 'Without category'}</span>
        </div>

        <div class="post-info__item">
            <h3 class="post-info__title">Post Title:</h3>
            <span class="bold post-info__info">${post.title}</span>
        </div>

        <div class="post-info__item">
            <h3 class="post-info__title">Post Description:</h3>
            <span class="post-info__info">${post.description}</span>
        </div>

        <div class="post-info__item">
            <h3 class="post-info__title">Post Text:</h3>
            <span class="post-info__info">${post.text}</span>
        </div>

        <div class="post-info__item">
            <h3 class="post-info__title">Post Image:</h3>
            <span class="post-info__info">
                ${post.image
                    ? `<img src="/../${post.image}" alt="Post image" />`
                    : 'Without image (template used)'}
            </span>
        </div>

        <div class="post-info__item">
            <h3 class="post-info__title">Post Created Date:</h3>
            <span class="post-info__info">${post.created_at}</span>
        </div>

        <div class="post-info__item">
            <h3 class="post-info__title">Post Updated Date:</h3>
            <span class="post-info__info">${post.updated_at || 'Not updated'}</span>
        </div>

        <div class="post-info__item">
            <h3 class="post-info__title">Comments Count:</h3>
            <span class="post-info__info">${post.comments_count}</span>
        </div>

        <button class="edit-post-btn details__btn" data-id="${post.id}">Edit Post</button>
        <button class="delete-post-btn delete__btn" data-id="${post.id}">Delete Post</button>
    `;

    postElement.innerHTML = postHTML;

    postElement.addEventListener('click', async (e) => {
        if (e.target.classList.contains('edit-post-btn')) {
            const postId = e.target.dataset.id;
            updatePostWithPopup(postId);

        } else if (e.target.classList.contains('delete-post-btn')) {
            // Подтверждение удаления поста
            if (!confirm('Are you sure you want to delete this post?')) return;

            const postId = e.target.dataset.id;
            if (!postId) return;

            const deletePost = await deletePostById(postId);

            if (deletePost) {
                // e.target.closest('.post-info__wrapper').remove();
                alert('Post deleted successfully');
                window.location.href = '/admin/posts';
            } else {
                alert('Failed to delete post');
            }
        }
    });

    return postElement;
}