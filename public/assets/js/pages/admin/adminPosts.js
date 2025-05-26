import { adminFetchShowPosts } from '../../modules/adminFetchShowPosts.js';
import { prepareWrapper } from '../../modules/helpers.js';


export function initAdminPostsPage() {

    const postsSection = document.querySelector('section.admin-posts');

    if (!postsSection) return;

    const postsWrapper = prepareWrapper(postsSection, '.admin-posts__wrapper');

    // Загружаем посты
    adminFetchShowPosts(postsWrapper);

}