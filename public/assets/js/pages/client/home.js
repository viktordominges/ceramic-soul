import { fetchPosts } from '../../modules/api.js';
import { fetchCategories } from '../../modules/api.js';
import { prepareWrapper } from '../../modules/helpers.js';
import { renderPost } from '../../components/client/renderPost.js';
import { renderPopularPostsTitles } from '../../components/client/renderPopularPostsTitles.js';
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
    fetchPosts()
        .then(data => {
            const posts = data.content;

            if (Array.isArray(posts) && posts.length) {
                // Отображение основных постов
                posts.forEach(post => postsWrapper.appendChild(renderPost(post)));

                // Отображение популярных постов
                posts.forEach(post => popularPostsWrapper.appendChild(renderPopularPostsTitles(post)));
            } else {
                showEmptyMessage(postsWrapper);
                showEmptyMessage(popularPostsWrapper);
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки постов:', error);
            showEmptyMessage(postsWrapper);
            showEmptyMessage(popularPostsWrapper);
        });


    fetchCategories()
            .then(data => {
                const categories = data.content;
                if (Array.isArray(categories) && categories.length) {
                    categories.forEach(category => categoriesListWrapper.appendChild(renderCategoriesNameList(category))); // Нужно создать и импортировать
                } else {
                    showEmptyMessage(categoriesListWrapper);
                }
            })
            .catch(error => {
                console.error('Ошибка загрузки категорий:', error);
            });
}
