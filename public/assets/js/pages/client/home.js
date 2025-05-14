import { fetchPosts } from '../../modules/api.js';
import { renderPost } from '../../components/client/renderPost.js';
import { showEmptyMessage } from '../../components/client/showEmptyMessage.js';

export function initHomePage() {
    const postsSection = document.querySelector('section.posts');
    if (!postsSection) return;

    let wrapper = postsSection.querySelector('.posts__wrapper');
    if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.classList.add('posts__wrapper');
        postsSection.appendChild(wrapper);
    } else {
        wrapper.innerHTML = '';
    }

    fetchPosts()
        .then(data => {
            const posts = data.content;
            if (Array.isArray(posts) && posts.length) {
                posts.forEach(post => wrapper.appendChild(renderPost(post)));
            } else {
                showEmptyMessage(wrapper);
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки постов:', error);
        });
}
