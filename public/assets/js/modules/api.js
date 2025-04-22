export async function fetchPosts() {
    const response = await fetch('/api/posts');
    return response.json();
}

export async function fetchCategories() {
    const response = await fetch('/api/categories');
    return response.json();
}