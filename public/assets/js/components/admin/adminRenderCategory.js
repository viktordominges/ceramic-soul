export function adminRenderCategory(category) {
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('categories-list__item');

    // Базовый HTML, общий для всех категорий
    let categoryHTML = `
        <span>${category.id}</span>
        <span>${category.name}</span>
        <span>${category.post_count}</span>
        <span></span>

        <a class="details__btn" href="/admin/category?name=${encodeURIComponent(category.name)}">Details</a>
    `;

    categoryElement.innerHTML = categoryHTML;

    return categoryElement;
}