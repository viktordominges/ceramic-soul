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
import { adminFetchShowStats } from './modules/adminFetchShowStats.js';
import { initAdminPostsPage } from './pages/admin/adminPosts.js';
import { initAdminCategoriesPage } from './pages/admin/adminCategories.js';
import { initAdminUsersPage } from './pages/admin/adminUsers.js';
import { initAdminSinglePostPage } from './pages/admin/adminSinglePost.js';
import { initAdminSingleCategoryPage } from './pages/admin/adminSingleCategory.js';
import { initAdminSingleUserPage } from './pages/admin/adminSingleUser.js';

import { createPostWithPopup } from './modules/createPostWithPopup.js';

document.addEventListener('DOMContentLoaded', () => {

    setActiveLink();

    if (document.querySelector('.auth-open__trigger')) {
        toggleDropdownMenuTriggers('.auth-open__trigger', '.dropdown-auth__menu', 'auth-close__trigger');
    } 
    
    if (document.querySelector('.user-open__trigger')) {
        toggleDropdownMenuTriggers('.user-open__trigger', '.dropdown-account__menu', 'user-close__trigger');
    }

    if (document.querySelector('.main-dropdown__menu_trigger')) {
        toggleDropdownMenuTriggers('.main-dropdown__menu_trigger', '.main-dropdown__menu', 'dropdown__close');
    }

    if (document.querySelector('.dropdown-account__menu')) {
        fetchLogout();
        fetchDeleteAccount();
    }
    
    const url = new URL(window.location.href);
    const path = url.pathname;
    const isAdmin = path.startsWith('/admin');

    // Если путь начинается с /admin, значит мы в админке
    if (isAdmin) {

        adminFetchShowStats();

        if (path === '/admin/posts') {

            initAdminPostsPage();
            document.querySelector('#create-post__btn').addEventListener('click', createPostWithPopup);

        } else if (path === '/admin/categories') {

            initAdminCategoriesPage();

        } else if (path === '/admin/users') {

            initAdminUsersPage();

        } else if (path === '/admin/post') {
            const slug = url.searchParams.get('slug');
            if (slug) {
                initAdminSinglePostPage(slug);
            }
        
        } else if (path === '/admin/category') {
            const name = url.searchParams.get('name');
            if (name) {
                initAdminSingleCategoryPage(name);
            }

        } else if (path === '/admin/user') {
            const id = url.searchParams.get('id');
            if (id) {
                initAdminSingleUserPage(id);
            }
        }
        else {
            // Если путь не соответствует ни одной из страниц админки, можно перенаправить на главную страницу админки
            window.location.href = '/admin/posts';
        }
        

    } else {
        //Маршруты
        if (path === '/categories') {
            initCategoriesPage();

        } else if (path === '/category') {
            const name = url.searchParams.get('name');
            if (name) {
                initCategoryPage(name);
            }

        } else if (path === '/post') {
            const slug = url.searchParams.get('slug');
            if (slug) {
                initPostPage(slug);
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
