export async function updatePostWithPopup(postId) {
    const container = document.getElementById('edit-post-popup-container');
    container.innerHTML = '';
 
    let post;
    let categories = [];

    try {
        const [postRes, categoriesRes] = await Promise.all([
            fetch(`/api/posts/id/${encodeURIComponent(postId)}`),
            fetch('/api/categories')
        ]);

        if (!postRes.ok || !categoriesRes.ok) throw new Error();

        post = await postRes.json();
        categories = await categoriesRes.json();
    } catch {
        alert('Failed to load post or categories');
        return;
    }

    const popup = document.createElement('div');
    popup.className = 'popup-overlay';
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Edit Post</h2>
            <form id="edit-post-form" class="admin-form" method="POST" enctype="multipart/form-data">
                <label>Title: <input type="text" name="title" value="${post.title}" required /></label>
                <label>Category:
                    <select name="category_id" required>
                        ${categories.map(cat => `<option value="${cat.id}" ${cat.id == post.category_id ? 'selected' : ''}>${cat.name}</option>`).join('')}
                    </select>
                </label>
                <label>Description: <textarea name="description" rows="3" required>${post.description}</textarea></label>
                <label>Image: <input type="file" name="image" accept="image/*" /></label>
                <label>Text: <textarea name="text" rows="5" required>${post.text}</textarea></label>
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

    document.getElementById('edit-post-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const response = await fetch(`/api/posts/${postId}/update`, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                alert('Post updated!');
                container.innerHTML = '';
                location.reload(); // или обнови только DOM
            } else {
                alert(result.error || 'Failed to update post');
            }
        } catch (err) {
            alert('Server error');
        }
    });
}
