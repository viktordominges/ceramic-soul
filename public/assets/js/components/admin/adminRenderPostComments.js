export function adminRenderPostComments(comment) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comments-list__item');

    // Базовый HTML, общий для всех постов
    let commentHTML = `
        <span>${comment.id}</span>
        <span>${comment.username}</span>
        <span>${comment.text}</span>
        <button class="delete__btn delete-comment-btn" data-id="${comment.id}">Delete</button>
    `;
 
    commentElement.innerHTML = commentHTML;

    return commentElement;
}