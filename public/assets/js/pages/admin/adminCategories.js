import { fetchShowCategories } from '../../modules/fetchShowCategories.js';
import { adminRenderCategory } from '../../components/admin/adminRenderCategory.js';
import { showEmptyMessage } from '../../components/client/showEmptyMessage.js';
import { prepareWrapper } from '../../modules/helpers.js';

export function initAdminCategoriesPage() {
    const categoriesSection = document.querySelector('section.admin-categories');

    if (!categoriesSection) return;

    const categoriesWrapper = prepareWrapper(categoriesSection, '.admin-categories__wrapper');

    fetchShowCategories({
        wrapper: categoriesWrapper,
        renderItem: adminRenderCategory,
        showEmptyMessageFn: showEmptyMessage
    });
}
