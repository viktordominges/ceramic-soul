export async function deletePostById(postId) {
    try {
        const response = await fetch(`/api/posts/${postId}/delete`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Unknown error');
        }

        return true;
    } catch (error) {
        console.error('Error deleting post:', error);
        return false;
    }
}

