import { fetchShowUserById } from '../../modules/fetchShowUserById.js';

import { adminRenderSingleUser } from '../../components/admin/adminRenderSingleUser.js'; //Нужно реализовать

import { fetchShowCommentsByUser } from '../../modules/fetchShowCommentsByUser.js';

import { adminRenderUserComments } from '../../components/admin/adminRenderUserComments.js'; //Нужно реализовать

import { prepareWrapper } from '../../modules/helpers.js';

import { showEmptyMessage } from '../../components/client/showEmptyMessage.js';



export function initAdminSingleUserPage(userId) {

    const userSection = document.querySelector('section.admin-single-user');
    const commentsListSection = document.querySelector('section.admin-comments');
    
    // Проверяем, что секция user, id и секция comments существуют
    if (!userSection || !userId || !commentsListSection) return;

    const commentsListWrapper = prepareWrapper(commentsListSection, 'comments-list__wrapper');

    // Загружаем пользователя по id
    fetchShowUserById(userId, userSection, adminRenderSingleUser, showEmptyMessage);

    // Загружаем список комментариев по пользователю
    fetchShowCommentsByUser(userId, commentsListWrapper, adminRenderUserComments, showEmptyMessage);



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