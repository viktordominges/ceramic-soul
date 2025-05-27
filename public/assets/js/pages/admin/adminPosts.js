import { fetchShowPosts } from '../../modules/fetchShowPosts.js';
import { prepareWrapper } from '../../modules/helpers.js';
import { adminRenderPost } from '../../components/admin/adminRenderPost.js';
import { showEmptyMessage } from '../../components/client/showEmptyMessage.js';


export function initAdminPostsPage() {

    const postsSection = document.querySelector('section.admin-posts');

    if (!postsSection) return;

    const postsWrapper = prepareWrapper(postsSection, '.admin-posts__wrapper');

    // Загружаем посты
    fetchShowPosts({
        wrapper: postsWrapper,
        renderItem: adminRenderPost,
        showEmptyMessageFn: showEmptyMessage
    });

}