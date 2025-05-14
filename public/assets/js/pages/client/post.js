import { fetchPostBySlug } from '../../modules/api.js';
import { renderSinglePost } from '../../components/client/renderSinglePost.js';
import { showEmptyMessage } from '../../components/client/showEmptyMessage.js';

export function initPostPage(slug) {

    // Получаем элемент секции постов и спан для имени категории
    const postSection = document.querySelector('section.single-post');
    
    // Проверяем, что секция постов и name категории существуют
    if (!postSection || !slug) return;

    // Создаем или очищаем контейнер для постов
    let wrapper = postSection.querySelector('.single-post__wrapper');
    if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.classList.add('single-post__wrapper');
        postSection.appendChild(wrapper);
    } else {
        wrapper.innerHTML = '';
    }

    // Загружаем посты по категории
    fetchPostBySlug(slug)
        .then(data => {
            const post = data.content;


            if (post) {
                wrapper.appendChild(renderSinglePost(post));
            } else {
                showEmptyMessage(wrapper);
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки поста по слагу:', error);
        });
}
