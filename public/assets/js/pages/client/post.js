import { fetchShowPostBySlug } from '../../modules/fetchShowPostBySlug.js';
import { renderSinglePost } from '../../components/client/renderSinglePost.js';

import { fetchShowPopularPosts } from '../../modules/fetchShowPopularPosts.js';

import { fetchShowCategories } from '../../modules/fetchShowCategories.js';
import { renderCategoriesNameList } from '../../components/client/renderCategoriesNameList.js';

import { fetchShowCommentsByPost } from '../../modules/fetchShowCommentsByPost.js';

import { renderPostComment } from '../../components/client/renderPostComment.js';

import { fetchCreateComment } from '../../modules/fetchCreateComment.js';

import { prepareWrapper } from '../../modules/helpers.js';
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

    // Загружаем пост по slug
    fetchShowPostBySlug(slug, singlePostWrapper, renderSinglePost, showEmptyMessage);

    // Загружаем список популярных постов
    fetchShowPopularPosts(popularPostsWrapper);

    //Боковой список категорий
    fetchShowCategories({
        wrapper: categoriesListWrapper,
        renderItem: renderCategoriesNameList,
        showEmptyMessageFn: showEmptyMessage
    });
 
    // Загружаем список комментариев по посту
    fetchShowCommentsByPost(slug, commentsListWrapper, renderPostComment, showEmptyMessage);

    // Добавляем новый комментарий
    fetchCreateComment(slug, commentsListWrapper, renderPostComment, showEmptyMessage);

}
