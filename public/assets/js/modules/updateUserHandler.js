import { limitInputLengthWithCounter } from './helpers.js';

export function updateUserHandler(formElement, validateFn, showErrorsFn) {

    if (formElement) {
        limitInputLengthWithCounter(formElement, {
            username: 95,
            email: 149,
            password: 250,
        });
    }

    const submitButton = formElement.querySelector('button[type="submit"]');

    formElement.addEventListener('input', () => {
        const errors = validateFn(formElement);
        submitButton.disabled = Object.keys(errors).length > 0;
        
        // Добавим класс .disabled для стилизации
        if (submitButton.disabled) {
            submitButton.classList.add('disabled');
        } else {
            submitButton.classList.remove('disabled');
        }

        showErrorsFn(formElement, errors);
    });

    formElement.addEventListener('submit', async (e) => {
        e.preventDefault();

        const errors = validateFn(formElement);

        if (Object.keys(errors).length > 0) {
            showErrorsFn(formElement, errors);
            return;
        }

        const formData = new FormData(formElement);

        try {
            const response = await fetch('/api/users/update', {
                method: 'POST',
                body: formData
            }); 

            const result = await response.json();

            if (response.ok && result.success) {
                alert('User updated successfully!');
                formElement.reset();
                // Редирект на главную страницу
                window.location.href = '/'; // или другой путь, если нужно
            } else {
                throw new Error(result.error || 'Update failed');
            }

        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error updating account.');
        }
    });
}
