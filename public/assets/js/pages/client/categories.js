import { fetchCategories } from '../../modules/api.js';
import { renderCategory } from '../../components/client/renderCategory.js';
import { showEmptyMessage } from '../../components/client/showEmptyMessage.js';

export function initCategoriesPage() {
    const categoriesSection = document.querySelector('section.categories');

    if (!categoriesSection) return;

    let wrapper = categoriesSection.querySelector('.categories__wrapper');

    if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.classList.add('categories__wrapper');
        categoriesSection.appendChild(wrapper);
    } else {
        wrapper.innerHTML = '';
    }

    fetchCategories()
        .then(data => {
            const categories = data.content;
            if (Array.isArray(categories) && categories.length) {
                categories.forEach(category => wrapper.appendChild(renderCategory(category)));
            } else {
                showEmptyMessage(wrapper);
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки категорий:', error);
        });
}
