import { fetchShowPostBySlug } from '../../modules/fetchShowPostBySlug.js';

import { fetchShowPostById } from '../../modules/fetchShowPostById.js';

// import { fetchShowItemBySlug } from '../../modules/fetchShowItemBySlug.js';

import { adminRenderSinglePost } from '../../components/admin/adminRenderSinglePost.js';

import { adminRenderPostComments } from '../../components/admin/adminRenderPostComments.js';

import { prepareWrapper } from '../../modules/helpers.js';

import { fetchShowCommentsByPost } from '../../modules/fetchShowCommentsByPost.js';

import { showEmptyMessage } from '../../components/client/showEmptyMessage.js';



export function initAdminSinglePostPage(postId) {


    const postSection = document.querySelector('section.admin-single-post');
    const commentsListSection = document.querySelector('section.admin-comments');
    
    // Проверяем, что секция постов и name категории существуют
    if (!postSection || !postId || !commentsListSection) return;

    const singlePostWrapper = postSection;

    const commentsListWrapper = prepareWrapper(commentsListSection, 'comments-list__wrapper');

    // Загружаем пост по slug
    //fetchShowPostBySlug(slug, singlePostWrapper, adminRenderSinglePost, showEmptyMessage);

    fetchShowPostById(postId, singlePostWrapper, adminRenderSinglePost, showEmptyMessage);

    // Загружаем список комментариев по посту
    fetchShowCommentsByPost(postId, commentsListWrapper, adminRenderPostComments, showEmptyMessage);



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