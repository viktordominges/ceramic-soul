import { fetchPostsByCategory } from '../../modules/api.js';
import { renderPost } from '../../components/client/renderPost.js';
import { showEmptyMessage } from '../../components/client/showEmptyMessage.js';

export function initCategoryPage(name) {

    // Получаем элемент секции постов и спан для имени категории
    const postsSection = document.querySelector('section.posts');
    const categoryNameSpan = document.querySelector('.category__name');

    // Проверяем, что секция постов и name категории существуют
    if (!postsSection || !name) return;

    // Создаем или очищаем контейнер для постов
    let wrapper = postsSection.querySelector('.posts__wrapper');
    if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.classList.add('posts__wrapper');
        postsSection.appendChild(wrapper);
    } else {
        wrapper.innerHTML = '';
    }

    // Загружаем посты по категории
    fetchPostsByCategory(name)
        .then(data => {
            const posts = data.content;
            const categoryName = data.content[0]?.category || 'Неизвестная категория'; // Предполагаем, что все посты имеют одну категорию
            categoryNameSpan.textContent = categoryName;

            if (Array.isArray(posts) && posts.length) {
                posts.forEach(post => wrapper.appendChild(renderPost(post)));
            } else {
                showEmptyMessage(wrapper);
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки постов по категории:', error);
        });
}
