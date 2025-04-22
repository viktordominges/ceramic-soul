export function fetchPosts() {
    return fetch('/api/posts').then(res => res.json());
}

export function fetchCategories() {
    return fetch('/api/categories').then(res => res.json());
}