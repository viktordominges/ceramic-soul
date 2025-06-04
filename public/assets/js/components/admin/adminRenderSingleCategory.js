import { deleteCategoryById } from '../../modules/deleteCategoryById.js';
import { updateCategoryWithPopup } from '../../modules/updateCategoryWithPopup.js';

export function adminRenderSingleCategory(category) {
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('category-info__wrapper');

    categoryElement.innerHTML = `
        <div class="category-info__item"><h3>Category ID:</h3><span>${category.id}</span></div>
        <div class="category-info__item"><h3>Category Name:</h3><span>${category.name}</span></div>
        <div class="category-info__item"><h3>Category Description:</h3><span>${category.description}</span></div>
        <div class="category-info__item"><h3>Category Image:</h3><span>
            ${category.image ? `<img src="/../${category.image}" alt="category image" />` : 'No image'}
        </span></div>
        <div class="category-info__item"><h3>Posts Count:</h3><span>${category.posts_count}</span></div>
        <div class="category-info__buttons">
            <button class="edit-category-btn details__btn" data-id="${category.id}">Update Category</button>
            <button class="delete-category-btn delete__btn" data-id="${category.id}">Delete Category</button>
        </div>
    `;

    categoryElement.addEventListener('click', async (e) => {
        const btn = e.target;
        const categoryId = btn.dataset.id;
        if (!categoryId) return;

        console.log(`Button clicked: ${btn.className}, Category ID: ${categoryId}`);
        
 
        if (btn.classList.contains('edit-category-btn')) {
            try {
                const res = await fetch(`/api/categories/category/${categoryId}`);
                const data = await res.json();
                if (res.ok && data.id) {
                    updateCategoryWithPopup(data);
                } else {
                    alert('Failed to load category');
                }
            } catch (err) {
                console.error(err);
                alert('Error fetching category data');
            }

        } else if (btn.classList.contains('delete-category-btn')) {
            if (!confirm('Are you sure you want to delete this category?')) return;
            const deleted = await deleteCategoryById(categoryId);
            if (deleted) {
                alert('Category deleted successfully');
                window.location.href = '/admin/categories';
            } else {
                alert('Category delete failed');
            }
        }
    });

    return categoryElement;
}
