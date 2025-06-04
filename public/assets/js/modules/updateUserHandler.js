export function updateUserHandler(formElement) {
    formElement.addEventListener('submit', async (e) => {
        e.preventDefault();

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
