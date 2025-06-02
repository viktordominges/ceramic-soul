import { fetchShowCategories } from './fetchShowCategories.js'; // если есть функция для обновления списка категорий
import { prepareWrapper } from './helpers.js';
import { adminRenderCategory } from '../components/admin/adminRenderCategory.js'; // рендер категории
import { showEmptyMessage } from '../components/client/showEmptyMessage.js';

export async function createCategoryWithPopup() {
    const container = document.getElementById('create-category-popup-container');
    container.innerHTML = '';

    const popup = document.createElement('div');
    popup.className = 'popup-overlay';
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Create New Category</h2>
            <form id="create-category-form" class="admin-form" method="POST" enctype="multipart/form-data">
                <label>
                    Name:
                    <input type="text" name="name" required />
                </label>
                <label>
                    Description:
                    <textarea name="description" rows="3" required></textarea>
                </label>
                <label>
                    Image:
                    <input type="file" name="image" accept="image/*" />
                </label>
                <div class="popup-buttons">
                    <button type="submit">Create</button>
                    <button type="button" id="close-popup-btn">Cancel</button>
                </div>
            </form>
        </div>
    `;

    container.appendChild(popup);

    document.getElementById('close-popup-btn').addEventListener('click', () => {
        container.innerHTML = '';
    });

    const form = document.getElementById('create-category-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('/api/categories/create', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                alert('Category created!');
                container.innerHTML = '';

                const categoriesSection = document.querySelector('section.admin-categories');
                if (categoriesSection) {
                    const categoriesWrapper = prepareWrapper(categoriesSection, '.admin-categories__wrapper');
                    categoriesWrapper.innerHTML = '';
                    fetchShowCategories({
                        wrapper: categoriesWrapper,
                        renderItem: adminRenderCategory,
                        showEmptyMessageFn: showEmptyMessage,
                    });
                }  
            } else {
                alert(result.error || 'Error creating category');
            }
        } catch (error) {
            console.error(error);
            alert('Server error');
        }
    });
}
