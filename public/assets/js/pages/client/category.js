import { fetchPostsByCategory } from '../../modules/api.js';
import { renderPost } from '../../components/client/renderPost.js';
import { showEmptyMessage } from '../../components/client/showEmptyMessage.js';

export function initCategoryPage(slug) {

    // Получаем элемент секции постов и спан для имени категории
    const postsSection = document.querySelector('section.posts');
    const categoryNameSpan = document.querySelector('.category-name');

    // Проверяем, что секция постов и slug категории существуют
    if (!postsSection || !slug) return;

    // Создаем или очищаем контейнер для постов
    let wrapper = postsSection.querySelector('.posts-wrapper');
    if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.classList.add('posts-wrapper');
        postsSection.appendChild(wrapper);
    } else {
        wrapper.innerHTML = '';
    }

    // Загружаем посты по категории
    fetchPostsByCategory(slug)
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
