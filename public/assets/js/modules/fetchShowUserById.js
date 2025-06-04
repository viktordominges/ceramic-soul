export async function fetchShowUserById(id, singleUserWrapper, renderItemFn, showEmptyMessageFn) {
    try {
        const response = await fetch(`/api/users/user/${encodeURIComponent(id)}`);
        if (!response.ok) {
            throw new Error(`Loading error: ${response.status}`);
        }

        const user = await response.json();

        if (user) {
            singleUserWrapper.appendChild(renderItemFn(user));
        } else {
            showEmptyMessageFn(singleUserWrapper, 'User by id not found.');
        }
    } catch (error) {
        console.error('Error loading user by id:', error);
        showEmptyMessageFn(singleUserWrapper, 'Error loading user by id.');
    }
} 