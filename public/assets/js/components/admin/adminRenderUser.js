export function adminRenderUser(user) {
    const userElement = document.createElement('div');
    userElement.classList.add('users-list__item');

    // Базовый HTML, общий для всех пользователей
    let userHTML = `
        <span>${user.id}</span>
        <span>${user.username}</span>
        <span>${user.email}</span>
        <span data-user-id="${user.id}" data-user-role="${user.role}" class="details__btn">Details</span>
    `;

    userElement.innerHTML = userHTML;

    return userElement;
}
