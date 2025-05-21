export async function fetchPosts() {
    const response = await fetch('/api/posts');
    if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
    }
    return response.json(); // возвращает массив постов напрямую (не { content: [...] })
}

export async function fetchCategories() {
    const response = await fetch('/api/categories');
    if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
    }
    return response.json();
}

export async function fetchPostsByCategory(name) {
    const response = await fetch(`/api/posts/category/${encodeURIComponent(name)}`);
    if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
    }
    return response.json();
}

export async function fetchPostBySlug(slug) {
    const response = await fetch(`/api/posts/post/${encodeURIComponent(slug)}`);
    if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
    }
    return response.json();
}

// Получить комментарии по post_id
// export async function fetchCommentsByPost(slug) {
//     const response = await fetch(`/api/comments/post/${encodeURIComponent(slug)}`);

//     if (!response.ok) {
//         throw new Error(`Ошибка загрузки комментариев поста: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log('Parsed JSON data:', data); // <-- Вот тут увидишь, пустой ли он или нет

//     return data;
// }

// Получить комментарии по user_id
export async function fetchCommentsByUser(userId) {
    const response = await fetch(`/api/comments/user/${userId}`);
    if (!response.ok) {
        throw new Error(`Ошибка загрузки комментариев пользователя: ${response.status}`);
    }
    return response.json();
}
