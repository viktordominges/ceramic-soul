// import { fetchCategories } from './modules/api.js';
// import { renderCategoryLink } from './components/client/renderCategory.js';
import { setActiveLink } from './modules/helpers.js';
import { initHomePage } from './pages/client/home.js';
import { initCategoriesPage } from './pages/client/categories.js';
import { initCategoryPage } from './pages/client/category.js';
import { initPostPage } from './pages/client/post.js';

document.addEventListener('DOMContentLoaded', () => {

    setActiveLink();
    // Проверяем, что мы находимся в админке
    // Если путь начинается с /admin, значит мы в админке
    const url = new URL(window.location.href);
    const path = url.pathname;
    const isAdmin = path.startsWith('/admin');

    if (isAdmin) {
        console.log('Админка: логика админки будет здесь');
    } else {
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
        } 
        else {
            initHomePage();
        }

        // Проверка: если путь /category и есть параметр slug
        // if (path === '/category') {
        //     const slug = url.searchParams.get('slug');
        //     if (slug) {
        //         initCategoryPage(slug);
        //     }
        // }
        
    }
    
});
