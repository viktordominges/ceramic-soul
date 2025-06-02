export function renderCategoriesNameList(category) {
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('categories-list__item');

    categoryElement.innerHTML = `
        <img src="assets/images/icons/gold-star.png" alt="star" />
        <a href="/category?id=${encodeURIComponent(category.id)}">${category.name}</a>
    `;

    return categoryElement;
}