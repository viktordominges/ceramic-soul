export function renderPostComment(comment) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment__item');

    commentElement.innerHTML = `
        <div class="comment__author">
            <img src="${comment.avatar ?? '/assets/images/placeholders/default-avatar.png'}" alt="Avatar" class="comment__avatar">
            <h3>${comment.username}</h3>
        </div>
        <p>${comment.text ?? ''}</p>
        <span>${new Date(comment.created_at).toLocaleDateString()}</span>
        ${comment.is_owner ? `
            <div class="comment__actions">
                <button class="edit-comment-btn" data-id="${comment.id}">Update</button>
                <button class="delete-comment-btn" data-id="${comment.id}">Delete</button>
            </div>
        ` : ''}
    `;

    return commentElement;
}
