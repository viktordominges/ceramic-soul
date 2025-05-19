export function renderPostComment(comment) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment__item');

    commentElement.innerHTML = `
        <h3 >${comment.username}</h3>
        <p>${comment.text ?? ''}</p>
        <span>${new Date(comment.created_at).toLocaleDateString()}</span>
    `;

    return commentElement;
}