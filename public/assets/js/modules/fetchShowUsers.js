export async function fetchShowUsers({
    endpoint = '/api/admin/users',
    adminsWrapper,
    usersWrapper,
    renderItem,
    showEmptyMessageFn
}) {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Loading error: ${response.status}`);
        }

        const users = await response.json();

        let hasAdmins = false;
        let hasUsers = false;

        if (Array.isArray(users) && users.length) {
            users.forEach(user => {
                if (user.role === 'admin') {
                    adminsWrapper.appendChild(renderItem(user));
                    hasAdmins = true;
                } else {
                    usersWrapper.appendChild(renderItem(user));
                    hasUsers = true;
                }
            });
        }

        if (!hasAdmins) {
            showEmptyMessageFn(adminsWrapper, 'No admins found.');
        }

        if (!hasUsers) {
            showEmptyMessageFn(usersWrapper, 'No regular users found.');
        }

    } catch (error) {
        console.error('Error loading users:', error);
        showEmptyMessageFn(adminsWrapper, 'Error loading users.');
        showEmptyMessageFn(usersWrapper, 'Error loading users.');
    }
}
