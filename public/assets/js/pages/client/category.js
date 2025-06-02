import { prepareWrapper } from '../../modules/helpers.js';
import { fetchShowPopularPosts } from '../../modules/fetchShowPopularPosts.js';
import { fetchShowPostsByCategory } from '../../modules/fetchShowPostsByCategory.js';
import { renderPost } from '../../components/client/renderPost.js';
import { fetchShowCategories } from '../../modules/fetchShowCategories.js';
import { renderCategoriesNameList } from '../../components/client/renderCategoriesNameList.js';
import { showEmptyMessage } from '../../components/client/showEmptyMessage.js';

export function initCategoryPage(categoryId) {

    // const categoryNameSpan = document.querySelector('.category__name');

    // Получаем элементы секций постов, популярных постов и категорий
    const postsSection = document.querySelector('section.posts');
    const popularPostsSection = document.querySelector('section.popular-posts');
    const categoriesListSection = document.querySelector('section.categories-list');

    // Проверяем, что секция постов и id категории существуют
    if (!postsSection || !categoryId || !popularPostsSection || !categoriesListSection) return;

    const postsWrapper = prepareWrapper(postsSection, '.posts__wrapper');
    const popularPostsWrapper = prepareWrapper(popularPostsSection, '.popular-posts__wrapper');
    const categoriesListWrapper = prepareWrapper(categoriesListSection, '.categories-list__wrapper');


    // Загружаем посты по категории
    fetchShowPostsByCategory(categoryId, postsWrapper, renderPost, showEmptyMessage, categoryNameSpan);

    // Загружаем список популярных постов
    fetchShowPopularPosts(popularPostsWrapper);

    //Боковой список категорий
    fetchShowCategories({
        wrapper: categoriesListWrapper,
        renderItem: renderCategoriesNameList,
        showEmptyMessageFn: showEmptyMessage
    });
}
