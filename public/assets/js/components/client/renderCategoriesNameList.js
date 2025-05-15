export function renderCategoriesNameList(category) {
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('categories-list__item');

    categoryElement.innerHTML = `
        <img src="assets/images/icons/gold-star.png" alt="star" />
        <a href="/category?name=${encodeURIComponent(category.name)}">${category.name}</a>
    `;

    return categoryElement;
}