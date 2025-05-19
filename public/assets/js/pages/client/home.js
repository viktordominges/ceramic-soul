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
            // Если данные — массив, используем его напрямую
            const posts = Array.isArray(data) ? data : data.content;
            
            console.log('Posts:', posts);
            
            if (Array.isArray(posts) && posts.length) {
                // Отображаем посты
                posts.forEach(post => postsWrapper.appendChild(renderPost(post)));
                // Отображаем популярные посты (если нужно)
                posts.forEach(post => popularPostsWrapper.appendChild(renderPopularPostsTitles(post)));
            } else {
                showEmptyMessage(postsWrapper, 'Постов пока нет.');
                showEmptyMessage(popularPostsWrapper, 'Популярных постов пока нет.');
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки постов:', error);
            showEmptyMessage(postsWrapper, 'Ошибка загрузки постов.');
            showEmptyMessage(popularPostsWrapper, 'Ошибка загрузки популярных постов.');
        });


    fetchCategories()
            .then(data => {
                // Если данные — массив, используем его напрямую
                const categories = Array.isArray(data) ? data : data.content;

                if (Array.isArray(categories) && categories.length) {
                    categories.forEach(category => categoriesListWrapper.appendChild(renderCategoriesNameList(category))); // Нужно создать и импортировать
                } else {
                    showEmptyMessage(categoriesListWrapper, 'Категорий пока нет.');
                }
            })
            .catch(error => {
                console.error('Ошибка загрузки категорий:', error);
                showEmptyMessage(categoriesListWrapper, 'Ошибка загрузки категорий.');
            });
}
