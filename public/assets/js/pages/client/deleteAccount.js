export function fetchDeleteAccount() {

    const deleteAccountButton = document.querySelector('.user-delete__trigger');

    deleteAccountButton.addEventListener('click', async function () {
        if (!confirm('Are you sure you want to delete your account? This action is irreversible.')) {
            return;
        }

        try {
            const response = await fetch('/api/users/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // важно для отправки сессионных cookie
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                // Перенаправляем на главную страницу
                window.location.href = '/';
            } else {
                alert(data.error || 'Error deleting account');
            }

        } catch (error) {
            console.error('Error sending request:', error);
            alert('Error connecting to server.');
        }
    });
}

