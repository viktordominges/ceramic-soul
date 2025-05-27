import { fetchShowUsers } from '../../modules/fetchShowUsers.js';
import { prepareWrapper } from '../../modules/helpers.js';
import { adminRenderUser } from '../../components/admin/adminRenderUser.js';
import { showEmptyMessage } from '../../components/client/showEmptyMessage.js';


export function initAdminUsersPage() {

    const usersSection = document.querySelector('section.admin-users');

    if (!usersSection) return;

    const usersWrapper = prepareWrapper(usersSection, '.admin-users__wrapper');

    // Загружаем пользователей
    fetchShowUsers({
        wrapper: usersWrapper,
        renderItem: adminRenderUser,
        showEmptyMessageFn: showEmptyMessage
    });

    console.log('Admin Users Page Initialized');
    
}
