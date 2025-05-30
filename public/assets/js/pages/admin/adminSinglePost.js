import { fetchShowPostBySlug } from '../../modules/fetchShowPostBySlug.js';

// import { fetchShowItemBySlug } from '../../modules/fetchShowItemBySlug.js';

import { adminRenderSinglePost } from '../../components/admin/adminRenderSinglePost.js';

import { adminRenderPostComments } from '../../components/admin/adminRenderPostComments.js';

import { prepareWrapper } from '../../modules/helpers.js';

import { fetchShowCommentsByPost } from '../../modules/fetchShowCommentsByPost.js';

import { showEmptyMessage } from '../../components/client/showEmptyMessage.js';



export function initAdminSinglePostPage(slug) {


    const postSection = document.querySelector('section.admin-single-post');
    const commentsListSection = document.querySelector('section.admin-comments');
    
    // Проверяем, что секция постов и name категории существуют
    if (!postSection || !slug || !commentsListSection) return;

    const singlePostWrapper = postSection;

    const commentsListWrapper = prepareWrapper(commentsListSection, 'comments-list__wrapper');

    // Загружаем пост по slug
    fetchShowPostBySlug(slug, singlePostWrapper, adminRenderSinglePost, showEmptyMessage);

    // Загружаем список комментариев по посту
    fetchShowCommentsByPost(slug, commentsListWrapper, adminRenderPostComments, showEmptyMessage);



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