export function adminRenderPostComments(comment) {
    const postElement = document.createElement('div');
    postElement.classList.add('comments-list__item');

    // Базовый HTML, общий для всех постов
    let postHTML = `
        <span>${comment.id}</span>
        <span>${comment.username}</span>
        <span>${comment.text}</span>
        <button class="delete__btn" data-id="${comment.id}">Delete</button>
    `;

    postElement.innerHTML = postHTML;

    return postElement;
}