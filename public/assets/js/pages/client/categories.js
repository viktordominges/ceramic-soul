import { fetchShowCategories } from '../../modules/fetchShowCategories.js';
import { renderCategory } from '../../components/client/renderCategory.js';
import { showEmptyMessage } from '../../components/client/showEmptyMessage.js';
import { prepareWrapper } from '../../modules/helpers.js';

export function initCategoriesPage() {
    const categoriesSection = document.querySelector('section.categories');

    if (!categoriesSection) return;

    const categoriesWrapper = prepareWrapper(categoriesSection, '.categories__wrapper');

    fetchShowCategories(categoriesWrapper, renderCategory, showEmptyMessage);
}
