import { fetchCategories } from '../../modules/api.js';
import { renderCategory } from '../../components/client/renderCategory.js';
import { showEmptyMessage } from '../../components/client/showEmptyMessage.js';
import { prepareWrapper } from '../../modules/helpers.js';

export function initCategoriesPage() {
    const categoriesSection = document.querySelector('section.categories');

    if (!categoriesSection) return;

    const categoriesWrapper = prepareWrapper(categoriesSection, '.categories__wrapper');

    fetchCategories()
        .then(data => {
            const categories = Array.isArray(data) ? data : data.content;

            if (Array.isArray(categories) && categories.length) {
                categories.forEach(category => categoriesWrapper.appendChild(renderCategory(category)));
            } else {
                showEmptyMessage(categoriesWrapper, 'Категорий пока нет.');
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки категорий:', error);
            showEmptyMessage(categoriesWrapper, 'Ошибка загрузки категорий.');
        });
}
