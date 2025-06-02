export async function deleteCategoryById(categoryId) {
    try {
        const response = await fetch(`/api/categories/${categoryId}/delete`, {
            method: 'DELETE',
            credentials: 'include'
        }); 
 
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Unknown error');
        }

        return true;
    } catch (error) {
        console.error('Error deleting category:', error);
        return false;
    }
}