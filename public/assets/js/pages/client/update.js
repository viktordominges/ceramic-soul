import { updateUserHandler } from '../../modules/updateUserHandler.js';
import { showValidationMessages } from './register.js';
import { limitInputLengthWithCounter } from '../../modules/helpers.js';


// Валидация всех полей формы [username, email, password, confirm_password, avatar, terms]
function validateUpdateForm(form) {

    const username = form.username.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirm_password.value;
    const avatar = form.avatar.files[0];

    const errors = {};

    if (username.length < 3) {
        errors.username = 'Name must be at least 3 characters';
    }

    if (password && password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (password && password !== confirmPassword) {
        errors.confirm_password = 'Passwords do not match';
    }

    if (avatar) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(avatar.type)) {
            errors.avatar = 'Allowed formats: jpeg, png, jpg';
        } else if (avatar.size > 1024 * 1024) {
            errors.avatar = 'File must be less than 1MB';
        }
    }

    return errors;
}


export async function fetchUpdateForm(updateFormId) {
    const form = document.getElementById(updateFormId);
    if (!form) return;

    // Ограничим длину ввода в полях формы
    // limitInputLengthWithCounter(form, {
    //     username: 95,
    //     email: 149,
    //     password: 250,
    // });

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
        updateUserHandler(form, validateUpdateForm, showValidationMessages);

    } catch (error) {
        console.error('Error fetching user info:', error);
        alert('Unable to load user info.');
    }
}