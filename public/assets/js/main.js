
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

document.addEventListener('DOMContentLoaded', () => {

    setActiveLink();

    if (document.getElementById('auth-open__trigger')) {
        toggleDropdownMenuTriggers('auth-open__trigger', '.dropdown-auth__menu', 'auth-close__trigger');
    } else {
        toggleDropdownMenuTriggers('user-open__trigger', '.dropdown-account__menu', 'user-close__trigger');
    };

    if (document.querySelector('.dropdown-account__menu')) {
        fetchLogout();
        fetchDeleteAccount();
    }
    // Проверяем, что мы находимся в админке
    // Если путь начинается с /admin, значит мы в админке
    const url = new URL(window.location.href);
    const path = url.pathname;
    const isAdmin = path.startsWith('/admin');

    if (isAdmin) {
        console.log('Админка: логика админки будет здесь');
    } else {
        //Маршруты
        if (path === '/categories') {
            initCategoriesPage();
            console.log('Страница категорий инициализирована');
        } else if (path === '/category') {
            const name = url.searchParams.get('name');
            if (name) {
                initCategoryPage(name);
            }
            console.log('Страница категории инициализирована');
        } else if (path === '/post') {
            const slug = url.searchParams.get('slug');
            if (slug) {
                initPostPage(slug);
            }
            console.log('Страница постов инициализирована');
        } else if (path === '/register') {
            console.log('Страница регистрации инициализирована');
            fetchRegisterForm('register-form');
        } else if (path === '/login') {
            console.log('Страница логина инициализирована');
            fetchLoginForm('login-form');
        } else {
            console.log('Главная страница инициализирована');
            initHomePage();
            
        }

    }
    
});
