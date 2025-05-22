export function renderPostComment(comment) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment__item');

    commentElement.innerHTML = `
        <h3>${comment.username}</h3>
        <p>${comment.text ?? ''}</p>
        <span>${new Date(comment.created_at).toLocaleDateString()}</span>
        ${comment.is_owner ? `
            <div class="comment__actions">
                <button class="edit-comment-btn" data-id="${comment.id}">Редактировать</button>
                <button class="delete-comment-btn" data-id="${comment.id}">Удалить</button>
            </div>
        ` : ''}
    `;

    return commentElement;
}
