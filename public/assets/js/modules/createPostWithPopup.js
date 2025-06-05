import { fetchShowPosts } from './fetchShowPosts.js';
import { prepareWrapper } from './helpers.js';
import { adminRenderPost } from '../components/admin/adminRenderPost.js';
import { showEmptyMessage } from '../components/client/showEmptyMessage.js';
import { limitInputLengthWithCounter } from './helpers.js';

 
export async function createPostWithPopup() {
    const container = document.getElementById('create-post-popup-container');
    container.innerHTML = '';

    // Загружаем категории
    let categories = [];
    try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error(`Failed to load categories: ${res.status}`);
        const data = await res.json();
        categories = Array.isArray(data) ? data : data.content;
    } catch (err) {
        alert('Failed to load categories');
        return;
    }

    // Создаём HTML попапа
    const popup = document.createElement('div');
    popup.className = 'popup-overlay';
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Create New Post</h2>
            <form id="create-post-form" class="admin-form" method="POST" enctype="multipart/form-data">
                <label>
                    Title:
                    <input type="text" name="title" required />
                </label>
                <label>
                    Category:
                    <select name="category_id" required>
                        ${categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('')}
                    </select>
                </label>
                <label>
                    Description:
                    <textarea name="description" rows="3" required></textarea>
                </label>
                <label>
                    Image:
                    <input type="file" name="image" accept="image/*" />
                </label>
                <label>
                    Text:
                    <textarea name="text" rows="5" required></textarea>
                </label>
                <div class="popup-buttons">
                    <button type="submit">Create</button>
                    <button type="button" id="close-popup-btn">Cancel</button>
                </div>
            </form>
        </div>
    `;

    container.appendChild(popup);

    // Закрытие попапа
    document.getElementById('close-popup-btn').addEventListener('click', () => {
        container.innerHTML = '';
    });

    // Обработка отправки формы
    const form = document.getElementById('create-post-form');

    // Ограничим максимальную длину полей в форме
    if (form) {
        limitInputLengthWithCounter(form, {
            title: 95,
            description: 250,
            text: 5000,
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('/api/posts/create', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                alert('Post created!');
                container.innerHTML = '';
                
                // Обновить список постов в админке
                const postsSection = document.querySelector('section.admin-posts');

                if (postsSection) {
                    const postsWrapper = prepareWrapper(postsSection, '.admin-posts__wrapper');
                    postsWrapper.innerHTML = ''; // Очистить текущие посты
                    fetchShowPosts({
                        wrapper: postsWrapper,
                        renderItem: adminRenderPost,
                        showEmptyMessageFn: showEmptyMessage
                    });
                }

            } else {
                alert(result.error || 'Error creating post');
            }
        } catch (error) {
            console.error(error);
            alert('Server error');
        }
    });
}
