export async function fetchPosts() {
    const response = await fetch('/api/posts');
    if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
    }
    return response.json();
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
