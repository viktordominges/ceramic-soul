import { prepareWrapper } from '../../modules/helpers.js';
import { fetchPosts } from '../../modules/api.js';
import { fetchPostsByCategory } from '../../modules/api.js';
import { renderPost } from '../../components/client/renderPost.js';
import { fetchCategories } from '../../modules/api.js';
import { renderPopularPostsTitles } from '../../components/client/renderPopularPostsTitles.js';
import { renderCategoriesNameList } from '../../components/client/renderCategoriesNameList.js';
import { showEmptyMessage } from '../../components/client/showEmptyMessage.js';

export function initCategoryPage(name) {

    // Получаем элемент секции постов и спан для имени категории
    const postsSection = document.querySelector('section.posts');
    const categoryNameSpan = document.querySelector('.category__name');
    const popularPostsSection = document.querySelector('section.popular-posts');
    const categoriesListSection = document.querySelector('section.categories-list');

    // Проверяем, что секция постов и name категории существуют
    if (!postsSection || !name || !popularPostsSection || !categoriesListSection) return;

    const postsWrapper = prepareWrapper(postsSection, '.posts__wrapper');
    const popularPostsWrapper = prepareWrapper(popularPostsSection, '.popular-posts__wrapper');
    const categoriesListWrapper = prepareWrapper(categoriesListSection, '.categories-list__wrapper');


    // Загружаем посты по категории
    fetchPostsByCategory(name)
        .then(data => {

            const posts = Array.isArray(data) ? data : data.content;

            const categoryName = data[0]?.category || 'Неизвестная категория'; // Предполагаем, что все посты имеют одну категорию
            categoryNameSpan.textContent = categoryName;

            if (Array.isArray(posts) && posts.length) {
                posts.forEach(post => postsWrapper.appendChild(renderPost(post)));
            } else {
                showEmptyMessage(postsWrapper, 'Постов в данной категории пока нет.');
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки постов по категории:', error);
            showEmptyMessage(postsWrapper, 'Oшибка загрузки постов по категории.');
        });

    //Пока просто все посты для списка. Нужно будет переделать в 5 самых популярных в категории    
    fetchPosts()
            .then(data => {
                const posts = Array.isArray(data) ? data : data.content;
    
                if (Array.isArray(posts) && posts.length) {

                    // Отображение популярных постов
                    posts.forEach(post => popularPostsWrapper.appendChild(renderPopularPostsTitles(post)));
                } else {
                    showEmptyMessage(popularPostsWrapper, 'Популярных постов пока нет.');
                }
            })
            .catch(error => {
                console.error('Ошибка загрузки постов:', error);
                showEmptyMessage(popularPostsWrapper, 'Ошибка загрузки постов.');
            });

    // Загружаем список категорий
    fetchCategories()
            .then(data => {
                const categories = Array.isArray(data) ? data : data.content;

                if (Array.isArray(categories) && categories.length) {
                    categories.forEach(category => categoriesListWrapper.appendChild(renderCategoriesNameList(category)));
                } else {
                    showEmptyMessage(categoriesListWrapper, 'Категорий пока нет.');
                }
            })
            .catch(error => {
                console.error('Ошибка загрузки категорий:', error);
                showEmptyMessage(categoriesListWrapper, 'Ошибка загрузки категорий.');
            });
}
