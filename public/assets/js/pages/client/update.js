import { updateUserHandler } from '../../modules/updateUserHandler.js';

export async function fetchUpdateForm() {
    const form = document.getElementById('update-form');
    if (!form) return;

    try {
        const response = await fetch('/api/users/current');

        if (!response.ok) throw new Error('Failed to load user');

        const user = await response.json();

        // Заполни форму
        form.querySelector('#username').value = user.username;

        // Показ аватара
        if (user.avatar) {
            const img = document.createElement('img');
            img.src = user.avatar;
            img.alt = 'Your avatar';
            img.width = 100;
            form.querySelector('#avatar').insertAdjacentElement('beforebegin', img);
        }

        // Обработчик обновления
        updateUserHandler(form);

    } catch (error) {
        console.error('Error fetching user info:', error);
        alert('Unable to load user info.');
    }
}