// document.addEventListener('DOMContentLoaded', function () {

//     fetch('/api/categories')
//         .then(response => response.json())
//         .then(data => {
//             // Проверяем, что 'content' действительно содержит массив категорий
//             if (Array.isArray(data.content)) {
//                 const categories = data.content;  // Извлекаем массив категорий
//                 const dropdownMenu = document.querySelector('.dropdown-menu');
//                 dropdownMenu.innerHTML = ''; // Очищаем
//                 categories.forEach(cat => {
//                     const link = document.createElement('a');
//                     link.href = `/category?slug=${cat.slug}`;
//                     link.id = `category-${cat.id}`; // Добавляем id для каждого элемента
//                     link.textContent = cat.name;
//                     dropdownMenu.appendChild(link);
//                 });
//             } else {
//                 console.error('Ожидался массив категорий в поле "content", но получен:', data);
//             }
//         })
//         .catch(error => {
//             console.error('Ошибка загрузки категорий:', error);
//         });


//     Заменяем fetch на поддельный промис

//     function fetchFakePosts() {
//         return new Promise(resolve => {
//             setTimeout(() => {
//                 resolve({
//                     json: () => Promise.resolve({
//                         content: [
//                             {
//                                 title: "Первый пост",
//                                 content: "Содержимое первого поста.",
//                                 slug: "pervyy-post",
//                                 image: "https://via.placeholder.com/400x200",
//                                 created_at: "2025-04-21T12:00:00Z",
//                                 updated_at: "2025-04-22T10:00:00Z",
//                                 category: "Технологии"
//                             },
//                             {
//                                 title: "Второй пост",
//                                 content: "Текст второго поста для теста.",
//                                 slug: "vtoroy-post",
//                                 image: "https://via.placeholder.com/400x200",
//                                 created_at: "2025-04-20T08:00:00Z",
//                                 updated_at: null,
//                                 category: "Путешествия"
//                             }
//                         ]
//                     })
//                 });
//             }, 500); // имитируем задержку
//         });
//     }

//     Используем вместо fetch('/api/posts')
//     fetch('/api/posts')
//         .then(response => response.json())
//         .then(data => {
//             const postsSection = document.querySelector('section.posts');
//             if (!postsSection) return console.error('Секция <section class="posts"> не найдена');

//             let postsWrapper = postsSection.querySelector('.posts-wrapper');
//             if (!postsWrapper) {
//                 postsWrapper = document.createElement('div');
//                 postsWrapper.classList.add('posts-wrapper');
//                 postsSection.appendChild(postsWrapper);
//             } else {
//                 postsWrapper.innerHTML = '';
//             }

//             if (Array.isArray(data.content) && data.content.length > 0) {
//                 data.content.forEach(post => {
//                     const postElement = document.createElement('div');
//                     postElement.classList.add('post-item');
//                     postElement.innerHTML = `
//                         <img src="${post.image}" alt="${post.title}" class="post-image" />
//                         <h2>${post.title}</h2>
//                         <p class="post-content">${post.content}</p>
//                         <a class="read-more" href="/post/${post.slug}">Read more</a>
//                         <span class="post-date">Created at: ${new Date(post.created_at).toLocaleDateString()}</span>
//                         <span class="post-date">Updated at: ${post.updated_at ? new Date(post.updated_at).toLocaleDateString() : '—'}</span>
//                         <p class="post-category">${post.category ?? 'Без категории'}</p>
//                     `;
//                     postsWrapper.appendChild(postElement);
//                 });
//             } else {
//                 const emptyMessage = document.createElement('p');
//                 emptyMessage.classList.add('no-posts');
//                 emptyMessage.textContent = 'Постов пока нет.';
//                 postsWrapper.appendChild(emptyMessage);
//             }
//         })
//         .catch(error => {
//             console.error('Ошибка загрузки постов:', error);
//         });

    
// });
