export async function deleteCategoryById(id) {
    try {
        const response = await fetch(`/api/categories/${encodeURIComponent(id)}/delete`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete category');
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
