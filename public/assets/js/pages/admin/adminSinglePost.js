import { fetchShowPostById } from '../../modules/fetchShowPostById.js';

import { adminRenderSinglePost } from '../../components/admin/adminRenderSinglePost.js';

import { adminRenderPostComments } from '../../components/admin/adminRenderPostComments.js';

import { prepareWrapper } from '../../modules/helpers.js';

import { fetchShowCommentsByPost } from '../../modules/fetchShowCommentsByPost.js';

import { showEmptyMessage } from '../../components/client/showEmptyMessage.js';



export async function initAdminSinglePostPage(postId) {


    const postSection = document.querySelector('section.admin-single-post');
    const commentsListSection = document.querySelector('section.admin-comments');
    
    // Проверяем, что секция постов и name категории существуют
    if (!postSection || !postId || !commentsListSection) return;

    const singlePostWrapper = postSection;

    const commentsListWrapper = prepareWrapper(commentsListSection, 'comments-list__wrapper');

    try {
        await fetchShowPostById(postId, singlePostWrapper, adminRenderSinglePost, showEmptyMessage);
    } catch (err) {
        console.error('Ошибка при загрузке поста:', err);
    }

    try {
        await fetchShowCommentsByPost(postId, commentsListWrapper, adminRenderPostComments, showEmptyMessage);
    } catch (err) {
        console.error('Ошибка при загрузке комментариев:', err);
    }

}