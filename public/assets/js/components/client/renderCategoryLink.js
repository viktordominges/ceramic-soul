export function renderCategoryLink(category) {
    const link = document.createElement('a');
    link.href = `/category?slug=${category.slug}`;
    link.textContent = category.name;
    link.classList.add('dropdown-item'); // или твой класс
    return link;
}
