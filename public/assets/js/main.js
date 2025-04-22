import { fetchCategories } from './modules/api.js';
import { renderCategoryLink } from './components/client/renderCategoryLink.js';
import { initHomePage } from './pages/client/home.js';
// import { initAdminDashboard } from './pages/admin/dashboard.js'; // позже

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    console.log('Текущий путь:', path);
    // Определим, где мы
    const isAdmin = path.startsWith('/admin');
    console.log('Это админка:', isAdmin);


    if (isAdmin) {
        // TODO: подключить admin dashboard init
        console.log('Админка: логика админки будет здесь');
    } else {
        // Загружаем категории для меню
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

        // Определяем, на какой мы клиентской странице
        if (path === '/' || path === '/index.php') {
            initHomePage();
        }
    }
});
