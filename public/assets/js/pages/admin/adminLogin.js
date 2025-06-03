export function fetchAdminLoginForm(formId) {
    const form = document.getElementById(formId);

    console.log(`Fetching admin login form with ID: ${formId}`);
    

    if (!form) {
        console.error(`Form with ID "${formId}" not found.`);
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        console.log('Admin login form submitted');
        
        const formData = new FormData(form);

        const email = formData.get('email')?.trim();
        const password = formData.get('password');

        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                body: formData,
                credentials: 'same-origin'
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                alert(result.message || 'Admin login successful!');
                form.reset();

                // Перенаправление в админку
                window.location.href = '/admin/posts';
            } else {
                alert(result.error || 'Admin login failed. Please try again.');
            }

        } catch (error) {
            console.error('Admin login error:', error);
            alert('An unexpected error occurred.');
        }
    });
}
