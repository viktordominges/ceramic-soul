import { prepareWrapper } from '../../modules/helpers.js';

import { showEmptyMessage } from '../../components/client/showEmptyMessage.js';

import { fetchShowPostsByCategory } from '../../modules/fetchShowPostsByCategory.js';

import { adminRenderPost } from '../../components/admin/adminRenderPost.js';

import { fetchShowCategoryByName } from '../../modules/fetchShowCategoryByName.js';

import { adminRenderSingleCategory } from '../../components/admin/adminRenderSingleCategory.js';



export function initAdminSingleCategoryPage(name) {

    const categorySection = document.querySelector('section.admin-single-category');
    const postsListSection = document.querySelector('section.admin-category-posts');
    
    // Проверяем, что секции для категории и для списка постов существуют
    if (!categorySection || !postsListSection || !name) return;

    const singleCategoryWrapper = categorySection;

    const postsListWrapper = prepareWrapper(postsListSection, '.admin-posts__wrapper');

    fetchShowCategoryByName(name, singleCategoryWrapper, adminRenderSingleCategory, showEmptyMessage)

    fetchShowPostsByCategory(name, postsListWrapper, adminRenderPost, showEmptyMessage)


    // fetchShowItemBySlug({
    //     slug,
    //     endpoint: '//posts/post/',
    //     wrapper: document.querySelector('.single-post__wrapper'),
    //     renderItemFn: renderPost,
    //     showEmptyMessageFn: showEmptyMessage,
    //     notFoundMessage: 'Post not found.',
    //     errorMessage: 'Error loading post.'
    // });

    

}