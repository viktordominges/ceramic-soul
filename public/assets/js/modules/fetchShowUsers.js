export async function fetchShowUsers({
    endpoint = '/api/admin/users',
    wrapper,
    renderItem,
    showEmptyMessageFn
}) {
    
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Loading error: ${response.status}`);
        }

        const users = await response.json();

        if (Array.isArray(users) && users.length) {
            users.forEach(user => {
                wrapper.appendChild(renderItem(user));
            });
        } else {
            showEmptyMessageFn(wrapper, 'There are no users yet.');
        }
    } catch (error) {
        console.error('Error loading users:', error);
        showEmptyMessageFn(wrapper, 'Error loading users.');
    }
}