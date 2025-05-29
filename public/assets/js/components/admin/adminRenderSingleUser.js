export function adminRenderSingleUser(user) {
    const userElement = document.createElement('div');
    userElement.classList.add('user-info__wrapper');

    // Базовый HTML, общий для всех постов
    let userHTML = `
        <div class="user-info__item">
            <h3 class="user-info__title">User ID:</h3>
            <span class="user-info__info">${user.id}</span>
        </div>

        <div class="user-info__item">
            <h3 class="user-info__title">User Name:</h3>
            <span class="user-info__info">${user.username}</span>
        </div>

        <div class="user-info__item">
            <h3 class="user-info__title">User Email:</h3>
            <span class="user-info__info">${user.email}</span>
        </div>

        <div class="user-info__item">
            <h3 class="user-info__title">User Role:</h3>
            <span class="user-info__info">${user.role}</span>
        </div>

        <div class="user-info__item">
            <h3 class="user-info__title">User Avatar:</h3>
            <span class="user-info__info">
                ${user.avatar
                    ? `<img src="/../${user.avatar}" alt="user avatar" />`
                    : 'Without avatar (template used)'}
            </span>
        </div>

        <div class="user-info__item">
            <h3 class="user-info__title">Created At:</h3>
            <span class="user-info__info">${user.created_at}</span>
        </div>

        <div class="user-info__item">
            <h3 class="user-info__title">Updated At:</h3>
            <span class="user-info__info">${user.updated_at}</span>
        </div>
    `;

    userElement.innerHTML = userHTML;

    return userElement;
}