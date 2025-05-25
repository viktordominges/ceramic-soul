document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    console.log(form);
    
    const usernameInput = form.username;
    const emailInput = form.email;
    const passwordInput = form.password;
    const confirmPasswordInput = form.confirm_password;
    const avatarInput = form.avatar;
    const termsCheckbox = form.terms;

    console.log(usernameInput, emailInput, passwordInput, confirmPasswordInput, avatarInput, termsCheckbox);
    

    const validationState = {
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
        avatar: true // не обязательно
    };

    const setError = (input, message) => {
        input.classList.add('invalid');
        input.classList.remove('valid');
        showMessage(input, message);
    };

    const setValid = (input) => {
        input.classList.add('valid');
        input.classList.remove('invalid');
        removeMessage(input);
    };

    const showMessage = (input, message) => {
        let msg = input.parentElement.querySelector('.input-error');
        console.log(msg);
        
        if (!msg) {
            msg = document.createElement('div');
            msg.className = 'input-error';
            input.parentElement.appendChild(msg);
            console.log(msg);
        }
        msg.textContent = message;
    };

    const removeMessage = (input) => {
        const msg = input.parentElement.querySelector('.input-error');
        if (msg) msg.remove();
    };

    usernameInput.addEventListener('input', () => {
        console.log(usernameInput.value);
        
        if (usernameInput.value.trim().length >= 3) {
            setValid(usernameInput);
            validationState.username = true;
        } else {
            console.log(usernameInput.value.trim().length);
            
            setError(usernameInput, 'Name must be at least 3 characters');
            validationState.username = false;
        }
    });

    emailInput.addEventListener('input', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(emailInput.value.trim())) {
            setValid(emailInput);
            validationState.email = true;
        } else {
            setError(emailInput, 'Enter a valid email');
            validationState.email = false;
        }
    });

    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.length >= 6) {
            setValid(passwordInput);
            validationState.password = true;
        } else {
            setError(passwordInput, 'Password must be at least 6 characters');
            validationState.password = false;
        }
        validateConfirmPassword(); // recheck confirm field
    });

    confirmPasswordInput.addEventListener('input', validateConfirmPassword);

    function validateConfirmPassword() {
        if (confirmPasswordInput.value === passwordInput.value && passwordInput.value.length >= 6) {
            setValid(confirmPasswordInput);
            validationState.confirmPassword = true;
        } else {
            setError(confirmPasswordInput, 'Passwords do not match');
            validationState.confirmPassword = false;
        }
    }

    avatarInput.addEventListener('change', () => {
        const file = avatarInput.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                setError(avatarInput, 'Invalid file type. Allowed: jpeg, png, jpg');
                validationState.avatar = false;
            } else if (file.size > 1024 * 1024) {
                setError(avatarInput, 'File is too large. Max size is 1MB');
                validationState.avatar = false;
            } else {
                setValid(avatarInput);
                validationState.avatar = true;
            }
        } else {
            setValid(avatarInput);
            validationState.avatar = true;
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Проверим, все ли поля валидны
        const allValid = Object.values(validationState).every(Boolean);

        if (!termsCheckbox.checked) {
            alert('You must agree to the terms');
            return;
        }

        if (!allValid) {
            alert('Please fix the errors in the form');
            return;
        }

        // Если все ок, можно отправить форму
        console.log('The form has been validated successfully.');
        form.submit(); // или отправка через fetch
    });
});
