import { fetchPostBySlug } from '../../modules/api.js';
import { renderSinglePost } from '../../components/client/renderSinglePost.js';

import { prepareWrapper } from '../../modules/helpers.js';

import { fetchPosts } from '../../modules/api.js';
import { renderPopularPostsTitles } from '../../components/client/renderPopularPostsTitles.js';

import { fetchCategories } from '../../modules/api.js';
import { renderCategoriesNameList } from '../../components/client/renderCategoriesNameList.js';

import { fetchCommentsByPost } from '../../modules/fetchCommentsByPost.js';

import { fetchCreateComment } from '../../modules/fetchCreateComment.js';

import { showEmptyMessage } from '../../components/client/showEmptyMessage.js';

export function initPostPage(slug) {

    // Получаем элемент секции постов и спан для имени категории
    const postSection = document.querySelector('section.single-post');
    const commentsListSection = document.querySelector('section.comments-list');
    const popularPostsSection = document.querySelector('section.popular-posts');
    const categoriesListSection = document.querySelector('section.categories-list');
    
    
    // Проверяем, что секция постов и name категории существуют
    if (!postSection || !slug || !popularPostsSection || !categoriesListSection || !commentsListSection) return;

    const singlePostWrapper = prepareWrapper(postSection, '.single-post__wrapper');
    const commentsListWrapper = prepareWrapper(commentsListSection, '.comments-list__wrapper');
    const popularPostsWrapper = prepareWrapper(popularPostsSection, '.popular-posts__wrapper');
    const categoriesListWrapper = prepareWrapper(categoriesListSection, '.categories-list__wrapper');

    // Загружаем посты по категории
    fetchPostBySlug(slug)
        .then(data => {
            const post = data;
            
            if (post) {
                singlePostWrapper.appendChild(renderSinglePost(post));
            } else {
                showEmptyMessage(singlePostWrapper, 'Пост не найден.');
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки поста по слагу:', error);
            showEmptyMessage(singlePostWrapper, 'Ошибка загрузки поста.');
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
            showEmptyMessage(popularPostsWrapper, 'Ошибка загрузки популярных постов.');
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


    fetchCommentsByPost(slug, commentsListWrapper);

    fetchCreateComment(slug, commentsListWrapper);

}
