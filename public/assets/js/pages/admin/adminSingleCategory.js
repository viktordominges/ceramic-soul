import { prepareWrapper } from '../../modules/helpers.js';

import { showEmptyMessage } from '../../components/client/showEmptyMessage.js';

import { fetchShowPostsByCategory } from '../../modules/fetchShowPostsByCategory.js';

import { adminRenderPost } from '../../components/admin/adminRenderPost.js';

import { fetchShowCategoryById } from '../../modules/fetchShowCategoryById.js';

import { adminRenderSingleCategory } from '../../components/admin/adminRenderSingleCategory.js';



export function initAdminSingleCategoryPage(id) {

    const categorySection = document.querySelector('section.admin-single-category');
    const postsListSection = document.querySelector('section.admin-category-posts');
    
    // Проверяем, что секции для категории и для списка постов существуют
    if (!categorySection || !postsListSection || !id) return;

    const singleCategoryWrapper = categorySection;

    const postsListWrapper = prepareWrapper(postsListSection, '.admin-posts__wrapper');

    fetchShowCategoryById(id, singleCategoryWrapper, adminRenderSingleCategory, showEmptyMessage);

    fetchShowPostsByCategory(id, postsListWrapper, adminRenderPost, showEmptyMessage);

}