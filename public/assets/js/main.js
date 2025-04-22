import { fetchCategories } from './modules/api.js';
import { renderCategoryLink } from './components/client/renderCategoryLink.js';
import { initHomePage } from './pages/client/home.js';
import { initCategoryPage } from './pages/client/category.js';

document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    const path = url.pathname;
    const isAdmin = path.startsWith('/admin');

    if (isAdmin) {
        console.log('Админка: логика админки будет здесь');
    } else {
        // Рендерим меню с категориями
        fetchCategories()
            .then(data => {
                const categories = data.content;
                const menu = document.querySelector('.dropdown-menu');
                if (Array.isArray(categories) && menu) {
                    menu.innerHTML = '';
                    categories.forEach(cat => menu.appendChild(renderCategoryLink(cat)));
                }
            })
            .catch(console.error);

        // Клиентская логика по страницам
        if (path === '/' || path === '/index.php') {
            initHomePage();
        }

        // Проверка: если путь /category и есть параметр slug
        if (path === '/category') {
            const slug = url.searchParams.get('slug');
            if (slug) {
                initCategoryPage(slug);
            }
        }
    }
});
