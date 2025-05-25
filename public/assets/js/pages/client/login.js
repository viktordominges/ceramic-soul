// import { toggleAuthTriggers } from "../../modules/helpers.js";

export function fetchLoginForm(formId) {

    const form = document.getElementById(formId);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const email = formData.get('email')?.trim();
        const password = formData.get('password');

        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: formData,
                credentials: 'same-origin'
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                alert(result.message || 'Login successful!');
                form.reset();

                window.location.href = '/';
            } else {
                alert(result.error || 'Login failed. Please try again.');
            }

        } catch (error) {
            console.error('Login error:', error);
            alert('An unexpected error occurred.');
        }
    });
}
