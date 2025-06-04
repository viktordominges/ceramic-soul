export function updateCategoryWithPopup(category) {
    const container = document.getElementById('edit-category-popup-container');
    container.innerHTML = '';

    const popup = document.createElement('div');
    popup.className = 'popup-overlay';

    popup.innerHTML = `
        <div class="popup-content">
            <h2>Edit Category</h2>
            <form id="edit-category-form" class="admin-form" enctype="multipart/form-data">
                <label>Name: <input type="text" name="name" value="${category.name}" required /></label>
                <label>Description: <textarea name="description" rows="3" required>${category.description}</textarea></label>
                <label>Current Image: ${category.image ? `<img src="${category.image}" style="max-width: 100px;">` : 'No image'}</label>
                <label>New Image: <input type="file" name="image" accept="image/*" /></label>
                <div class="popup-buttons">
                    <button type="submit">Update</button>
                    <button type="button" id="close-edit-popup-btn">Cancel</button>
                </div>
            </form>
        </div>
    `;
 
    container.appendChild(popup);

    document.getElementById('close-edit-popup-btn').addEventListener('click', () => {
        container.innerHTML = '';
    });

    document.getElementById('edit-category-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const res = await fetch(`/api/categories/${category.id}/update`, {
                method: 'POST',
                body: formData,
            });

            const result = await res.json();

            if (result.success) {
                alert('Updated');
                container.innerHTML = '';
                location.reload();
            } else {
                alert(result.error || 'Update failed');
            }
        } catch (err) {
            console.error(err);
            alert('Server error');
        }
    });
}
