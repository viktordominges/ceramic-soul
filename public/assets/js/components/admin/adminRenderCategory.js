export function adminRenderCategory(category) {
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('categories-list__item');

    // Базовый HTML, общий для всех категорий
    let categoryHTML = `
        <span>${category.id}</span>
        <span>${category.name}</span>
        <span>${category.post_count}</span>
        <span class="details__btn">Details</span>
    `;

    categoryElement.innerHTML = categoryHTML;

    return categoryElement;
}