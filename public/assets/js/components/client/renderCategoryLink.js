export function renderCategoryLink(category) {
    const link = document.createElement('a');
    link.href = `/category?slug=${category.slug}`;
    link.id = `category-${category.id}`;
    link.textContent = category.name;
    return link;
}
