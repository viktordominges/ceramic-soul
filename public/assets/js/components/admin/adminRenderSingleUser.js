import { deleteUserById } from '../../modules/deleteUserById.js';
// import { fetchShowUsers } from '../../modules/fetchShowUsers.js';
// import { showEmptyMessage } from '../client/showEmptyMessage.js';
// import { prepareWrapper } from '../../modules/helpers.js';
// import { adminRenderUser } from './adminRenderUser.js';

export function adminRenderSingleUser(user) {
    const userElement = document.createElement('div');
    userElement.classList.add('user-info__wrapper');

    userElement.innerHTML = `
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

        <div class="user-info__buttons">
            <button class="edit-user-btn details__btn" data-id="${user.id}">Update User</button>
            <button class="delete-user-btn delete__btn" data-id="${user.id}">Delete User</button>
        </div>
    `;

    userElement.addEventListener('click', async (e) => {
        const btn = e.target;
        const userId = parseInt(btn.dataset.id, 10);
        if (!userId) return;

        if (btn.classList.contains('edit-user-btn')) {
            // Заглушка или вызов popup для обновления
            alert('Update functionality not implemented yet.');
            // const res = await fetch(`/api/users/${userId}`);
            // const data = await res.json();
            // if (res.ok && data.id) {
            //     updateUserWithPopup(data);
            // } else {
            //     alert('Failed to load user');
            // }

        } else if (btn.classList.contains('delete-user-btn')) {

            if (!confirm('Are you sure you want to delete this user?')) return;

            const deleted = await deleteUserById(userId);

            if (deleted) {
                alert('User deleted successfully');
                window.location.href = '/admin/users';
            } else {
                alert('User delete failed');
            }
        }
    });

    return userElement;
}