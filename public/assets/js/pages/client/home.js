import { fetchShowPosts } from '../../modules/fetchShowPosts.js';
import { fetchShowPopularPosts } from '../../modules/fetchShowPopularPosts.js';
import { fetchShowCategories } from '../../modules/fetchShowCategories.js';
import { prepareWrapper } from '../../modules/helpers.js';
import { renderCategoriesNameList } from '../../components/client/renderCategoriesNameList.js';
import { showEmptyMessage } from '../../components/client/showEmptyMessage.js';

export function initHomePage() {
    const postsSection = document.querySelector('section.posts');
    const popularPostsSection = document.querySelector('section.popular-posts');
    const categoriesListSection = document.querySelector('section.categories-list');

    if (!postsSection || !popularPostsSection || !categoriesListSection) return;

    const postsWrapper = prepareWrapper(postsSection, '.posts__wrapper');
    const popularPostsWrapper = prepareWrapper(popularPostsSection, '.popular-posts__wrapper');
    const categoriesListWrapper = prepareWrapper(categoriesListSection, '.categories-list__wrapper');

    // Загружаем посты
    fetchShowPosts(postsWrapper);

    // Загружаем список популярных постов
    fetchShowPopularPosts(popularPostsWrapper);

    // Загружаем список категорий
    fetchShowCategories(categoriesListWrapper, renderCategoriesNameList, showEmptyMessage);
}
