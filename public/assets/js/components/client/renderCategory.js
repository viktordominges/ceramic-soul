export function renderCategory(category) {
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('category__item');

    categoryElement.innerHTML = `
        <img class="category__item_image" src="${category.image}" alt="${category.name}" />
        <h2 class="category__item_name">${category.name}</h2>
        <p class="category__item_description">${category.description ?? ''}</p>
        <a class="category__item_link" href="/category?name=${encodeURIComponent(category.name)}">explore</a>
    `;

    return categoryElement;
}
