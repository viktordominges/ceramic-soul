export function fetchLogout() {
    const logoutTrigger = document.querySelector('.user-logout__trigger');

    if (logoutTrigger) {
        logoutTrigger.addEventListener('click', async () => {
            try {
                const res = await fetch('/api/users/logout', {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                    }
                });

                const data = await res.json();

                if (res.ok) {
                    console.log('Logout successful');
                    location.reload();
                } else {
                    console.error('Logout failed:', data.error || 'Unknown error');
                    alert('Logout failed: ' + (data.error || 'Server error'));
                }
            } catch (err) {
                console.error('Logout request failed:', err);
                alert('Logout error. Try again later.');
            }
        });
    }
}
    

