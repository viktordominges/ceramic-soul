export function adminRenderSingleCategory(category) {
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('category-info__wrapper');

    // Базовый HTML, общий для всех постов
    let categoryHTML = `
        <div class="category-info__item">
            <h3 class="category-info__title">Category ID:</h3>
            <span class="category-info__info">${category.id}</span>
        </div>

        <div class="category-info__item">
            <h3 class="category-info__title">Category Name:</h3>
            <span class="category-info__info">${category.name}</span>
        </div>

        <div class="category-info__item">
            <h3 class="category-info__title">Category Description:</h3>
            <span class="category-info__info">${category.description}</span>
        </div>

        <div class="category-info__item">
            <h3 class="category-info__title">Category Image:</h3>
            <span class="category-info__info">
                ${category.image
                    ? `<img src="/../${category.image}" alt="category image" />`
                    : 'Without image (template used)'}
            </span>
        </div>

        <div class="category-info__item">
            <h3 class="category-info__title">Posts Count:</h3>
            <span class="category-info__info">${category.posts_count}</span>
        </div>
    `;

    categoryElement.innerHTML = categoryHTML;

    return categoryElement;
}