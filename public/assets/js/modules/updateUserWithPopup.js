// modules/updateUserWithPopup.js

import { showEmptyMessage } from '../components/client/showEmptyMessage.js';
import { fetchShowUserById } from './fetchShowUserById.js';
import { adminRenderSingleUser } from '../components/admin/adminRenderSingleUser.js';

export function updateUserWithPopup(user) {
    const container = document.getElementById('update-user-popup-container');
    container.innerHTML = '';

    const popup = document.createElement('div');
    popup.className = 'popup-overlay';
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Update User</h2>
            <form id="update-user-form" class="admin-form" method="POST" enctype="multipart/form-data">
                <label>
                    Name:
                    <input type="text" name="username" value="${user.username}" required />
                </label>
                <label>
                    Password (leave blank to keep current):
                    <input type="password" name="password" />
                </label>
                <label>
                    Confirm Password:
                    <input type="password" name="confirm_password" />
                </label>
                <label>
                    Avatar (optional):
                    <input type="file" name="avatar" accept="image/*" />
                </label>
                <div class="popup-buttons">
                    <button type="submit">Update</button>
                    <button type="button" id="close-user-popup-btn">Cancel</button>
                </div>
            </form>
        </div>
    `;

    container.appendChild(popup);

    document.getElementById('close-user-popup-btn').addEventListener('click', () => {
        container.innerHTML = '';
    });

    const form = document.getElementById('update-user-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch(`/api/users/${user.id}/update`, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                alert('User updated successfully');

                // Clear the popup container
                container.innerHTML = '';

                // Получаем контейнер для отображения информации о пользователе
                const singleUserWrapper = document.querySelector('.user-info__wrapper');

                if (!singleUserWrapper) {
                    console.error('Single user wrapper not found');
                    return;
                }

                // Очищаем содержимое контейнера
                singleUserWrapper.innerHTML = '';

                const id = user.id;

                // Fetch and render the updated user information
                fetchShowUserById(id, singleUserWrapper, adminRenderSingleUser, showEmptyMessage)

            } else {
                alert(result.error || 'Error updating user');
            }
        } catch (error) {
            console.error(error);
            alert('Server error');
        }
    });
} 
