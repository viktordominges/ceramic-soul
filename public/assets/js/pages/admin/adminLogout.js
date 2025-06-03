export function fetchAdminLogout(logoutTriggerClass) {
    const logoutTrigger = document.querySelector(logoutTriggerClass);

    if (logoutTrigger) {
        logoutTrigger.addEventListener('click', async () => {
            try {
                const res = await fetch('/api/admin/logout', {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                    }
                });

                const data = await res.json();

                if (res.ok) {
                    console.log('Logout successful');
                    window.location.href = '/admin';
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