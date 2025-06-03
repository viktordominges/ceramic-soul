import { prepareWrapper } from './helpers.js';
import { fetchShowUsers } from './fetchShowUsers.js'; // если есть функция отображения списка
import { adminRenderUser } from '../components/admin/adminRenderUser.js';
import { showEmptyMessage } from '../components/client/showEmptyMessage.js';

export async function createUserWithPopup() {
    const container = document.getElementById('create-user-popup-container');
    container.innerHTML = '';

    const popup = document.createElement('div');
    popup.className = 'popup-overlay';
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Create New User</h2>
            <form id="create-user-form" class="admin-form" method="POST" enctype="multipart/form-data">
                <label>
                    Name:
                    <input type="text" name="username" required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" required />
                </label>
                <label> 
                    Password:
                    <input type="password" name="password" required />
                </label>
                <label>
                    Role:
                    <select name="role" required>
                        <option value="user" selected>User</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>
                <label>
                    Avatar (optional):
                    <input type="file" name="avatar" accept="image/*" />
                </label>
                <div class="popup-buttons">
                    <button type="submit">Create</button>
                    <button type="button" id="close-user-popup-btn">Cancel</button>
                </div>
            </form>
        </div>
    `;

    container.appendChild(popup);

    document.getElementById('close-user-popup-btn').addEventListener('click', () => {
        container.innerHTML = '';
    });

    const form = document.getElementById('create-user-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                alert('User created!');
                container.innerHTML = '';

                const usersSection = document.querySelector('section.admin-users');
                if (usersSection) {

                    const usersWrapper = prepareWrapper(usersSection, '.admin-users__wrapper');
                    const adminsWrapper = prepareWrapper(usersSection, '.admin-users__wrapper_admin');
                    
                    // Очищаем текущие списки пользователей и администраторов
                    usersWrapper.innerHTML = '';
                    adminsWrapper.innerHTML = '';

                    // Загружаем пользователей и администраторов снова
                    fetchShowUsers({
                        adminsWrapper: adminsWrapper,
                        usersWrapper: usersWrapper,
                        renderItem: adminRenderUser,
                        showEmptyMessageFn: showEmptyMessage
                    });

                }
            } else {
                alert(result.error || 'Error creating user');
            }
        } catch (error) {
            console.error(error);
            alert('Server error');
        }
    });
}
