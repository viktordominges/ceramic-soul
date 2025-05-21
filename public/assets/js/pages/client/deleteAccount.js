export function fetchDeleteAccount() {

    const deleteAccountButton = document.querySelector('.user-delete__trigger');

    deleteAccountButton.addEventListener('click', async function () {
        if (!confirm('Вы уверены, что хотите удалить аккаунт? Это действие необратимо.')) {
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
                alert(data.error || 'Ошибка при удалении аккаунта');
            }

        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            alert('Ошибка подключения к серверу.');
        }
    });
}

