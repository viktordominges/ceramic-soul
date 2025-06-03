// Клиент
import { setActiveLink } from './modules/helpers.js';
import { toggleDropdownMenuTriggers } from './modules/helpers.js';
import { initHomePage } from './pages/client/home.js';
import { initCategoriesPage } from './pages/client/categories.js';
import { initCategoryPage } from './pages/client/category.js';
import { initPostPage } from './pages/client/post.js';
import { fetchRegisterForm } from './pages/client/register.js';
import { fetchLoginForm } from './pages/client/login.js';
import { fetchLogout } from './pages/client/logout.js';
import { fetchDeleteAccount } from './pages/client/deleteAccount.js';

// Админка
import { fetchAdminLoginForm } from './pages/admin/adminLogin.js';
import { adminFetchShowStats } from './modules/adminFetchShowStats.js';
import { initAdminPostsPage } from './pages/admin/adminPosts.js';
import { initAdminCategoriesPage } from './pages/admin/adminCategories.js';
import { initAdminUsersPage } from './pages/admin/adminUsers.js';
import { initAdminSinglePostPage } from './pages/admin/adminSinglePost.js';
import { initAdminSingleCategoryPage } from './pages/admin/adminSingleCategory.js';
import { initAdminSingleUserPage } from './pages/admin/adminSingleUser.js';

import { createPostWithPopup } from './modules/createPostWithPopup.js';
import { createCategoryWithPopup } from './modules/createCategoryWithPopup.js';
import { createUserWithPopup } from './modules/createUserWithPopup.js';
import { fetchAdminLogout } from './pages/admin/adminLogout.js';

document.addEventListener('DOMContentLoaded', () => {

    // Устанавливаем активную ссылку в навигации
    // Это нужно для того, чтобы при загрузке страницы активная ссылка была подсвечена
    setActiveLink();

    // Инициализируем триггеры для дропдаун меню
    if (document.querySelector('.auth-open__trigger')) {
        toggleDropdownMenuTriggers('.auth-open__trigger', '.dropdown-auth__menu', 'auth-close__trigger');
    } 

    // Если есть триггер для аккаунта пользователя, то инициализируем дропдаун меню
    if (document.querySelector('.user-open__trigger')) {
        toggleDropdownMenuTriggers('.user-open__trigger', '.dropdown-account__menu', 'user-close__trigger');
    }

    // Если есть триггер для главного дропдаун меню, то инициализируем дропдаун меню
    if (document.querySelector('.main-dropdown__menu_trigger')) {
        toggleDropdownMenuTriggers('.main-dropdown__menu_trigger', '.main-dropdown__menu', 'dropdown__close');
    }

    // Если есть триггер для админского аккаунта, то инициализируем дропдаун меню
    if (document.querySelector('.admin-account__trigger')) {
        toggleDropdownMenuTriggers('.admin-account__trigger', '.admin-account__dropdown-menu', 'admin-close__trigger');
    }

    // Если есть триггер для аккаунта пользователя, то инициализируем обработку событий логаут и удаления для дропдаун меню
    if (document.querySelector('.dropdown-account__menu')) {
        fetchLogout();
        fetchDeleteAccount();
    }
    
    const url = new URL(window.location.href);
    const path = url.pathname;
    const isAdmin = path.startsWith('/admin');
    
    // Если путь начинается с /admin, значит мы в админке
    if (isAdmin) {

        fetchAdminLogout('.admin-logout__trigger');
        
        if (path === '/admin') {

            fetchAdminLoginForm('admin-login-form');
            return;
        }
        // Генерируем статистику для админки
        adminFetchShowStats();

        if (path === '/admin/posts') {

            initAdminPostsPage();
            document.querySelector('#create-post__btn').addEventListener('click', createPostWithPopup);

        } else if (path === '/admin/categories') {

            initAdminCategoriesPage();
            document.querySelector('#create-category__btn').addEventListener('click', createCategoryWithPopup);

        } else if (path === '/admin/users') {

            initAdminUsersPage();
            document.querySelector('#create-user__btn').addEventListener('click', createUserWithPopup);

        } else if (path === '/admin/post') {
            const postId = url.searchParams.get('id');
            if (postId) {
                initAdminSinglePostPage(postId);
            }
        
        } else if (path === '/admin/category') {
            const id = url.searchParams.get('id');
            if (id) {
                initAdminSingleCategoryPage(id);
            }

        } else if (path === '/admin/user') {
            const id = url.searchParams.get('id');
            if (id) {
                initAdminSingleUserPage(id);
            }
        }
        else {
            // Если путь не соответствует ни одной из страниц админки, можно перенаправить на страницу логина админа
            window.location.href = '/admin';
        }
        

    } else {
        //Маршруты
        if (path === '/categories') {
            initCategoriesPage();

        } else if (path === '/category') {
            const id = url.searchParams.get('id');
            if (id) {
                initCategoryPage(id);
            }

        } else if (path === '/post') {
            const postId = url.searchParams.get('id');
            if (postId) {
                initPostPage(postId);
            }

        } else if (path === '/register') {

            fetchRegisterForm('register-form');
        } else if (path === '/login') {

            fetchLoginForm('login-form');
        } else {

            initHomePage();
            
        }

    }
    
});
