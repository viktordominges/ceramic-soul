export function renderCategory(category) {
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('category__item');

    categoryElement.innerHTML = `
        <img src="${category.image}" alt="${category.name}" class="category__item_image" />
        <h2 class="category__item_name">${category.name}</h2>
        <p class="category__item_content">${category.description ?? ''}</p>
        <a class="category__item_link" href="/category?name=${encodeURIComponent(category.name)}">Go to category</a>
    `;

    return categoryElement;
}
