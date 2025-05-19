
export function register(formId) {
    const form = document.getElementById(formId);

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // предотвращаем стандартную отправку формы

        const formData = new FormData(form);

        const password = formData.get('password');
        const confirmPassword = formData.get('confirm_password');

        // Простая проверка на совпадение паролей
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message || 'Registration successful!');
                form.reset();
                window.location.href = '/login';
            } else {
                alert(result.error || 'Something went wrong. Please try again.');
            }

        } catch (error) {
            console.error('Registration error:', error);
            alert('An unexpected error occurred.');
        }
    });
}


