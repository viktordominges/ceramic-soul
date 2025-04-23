export function renderCategory(category) {
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('category-item');

    categoryElement.innerHTML = `
        <img src="${category.image}" alt="${category.name}" class="category-image" />
        <h2 class="category-name">${category.name}</h2>
        <p class="category-content">${category.description ?? ''}</p>
        <a class="category-link" href="/category?name=${encodeURIComponent(category.name)}">Go to category</a>
    `;

    return categoryElement;
}
