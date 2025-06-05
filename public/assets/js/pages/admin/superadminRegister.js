function validateSuperadminRegisterForm(form) {
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const token = form.token.value;
    const avatar = form.avatar.files[0];

    const errors = {};

    if (username.length < 3) {
        errors.username = 'Name must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.email = 'Enter a valid email';
    }

    if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (!token) {
        errors.token = 'Token is required';
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


// Показываем сообщения об ошибках
export function showValidationMessages(form, errors) {

    [...form.elements].forEach(input => {
        if (!input.name) return;

        // Находим контейнер с полем — самый ближайший <div>
        const wrapper = input.closest('div');
        if (!wrapper) return;

        const existing = wrapper.querySelector('.input-error');
        if (existing) existing.remove();

        input.classList.remove('invalid', 'valid');

        if (errors[input.name]) {
            input.classList.add('invalid');
            const msg = document.createElement('div');
            msg.className = 'input-error';
            msg.textContent = errors[input.name];
            wrapper.appendChild(msg);
        } else {
            input.classList.add('valid');
        }
    });
}


// Активируем валидацию, показ сообщений об ошибках и отправку формы
export function fetchSuperadminRegisterForm(formId) {
    const form = document.getElementById(formId);

    console.log(`Initializing superadmin registration form with ID: ${formId}`);
    

    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('input', () => {
        const errors = validateSuperadminRegisterForm(form);
        submitButton.disabled = Object.keys(errors).length > 0;
        
        // Добавим класс .disabled для стилизации
        if (submitButton.disabled) {
            submitButton.classList.add('disabled');
        } else {
            submitButton.classList.remove('disabled');
        }

        showValidationMessages(form, errors);
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const errors = validateSuperadminRegisterForm(form);
        showValidationMessages(form, errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const formData = new FormData(form);
 
        try {
            const response = await fetch('/api/superadmin/register', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message || 'Registration successful!');
                form.reset();
                window.location.href = '/admin';
            } else {
                alert(result.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('An unexpected error occurred.');
        }
    });
}
