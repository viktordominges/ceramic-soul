export function adminRenderUser(user) {
    const userElement = document.createElement('div');
    userElement.classList.add('users-list__item');

    // Базовый HTML, общий для всех пользователей
    let userHTML = `
        <span>${user.id}</span>
        <span>${user.username}</span>
        <span>${user.email}</span>
        <span></span>
    
        <a class="details__btn" data-user-role="${user.role}" href="/admin/user?id=${user.id}">Details</a>
    `;
    
    userElement.innerHTML = userHTML;

    return userElement;
}
