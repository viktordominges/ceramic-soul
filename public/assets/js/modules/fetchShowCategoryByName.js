export async function fetchShowCategoryByName(name, singleCategoryWrapper, renderItemFn, showEmptyMessageFn) {
    try {
        const response = await fetch(`/api/categories/category/${encodeURIComponent(name)}`);
        if (!response.ok) {
            throw new Error(`Loading error: ${response.status}`);
        }

        const category = await response.json();

        if (category) {
            singleCategoryWrapper.appendChild(renderItemFn(category));
        } else {
            showEmptyMessageFn(singleCategoryWrapper, 'Category by name not found.');
        }
    } catch (error) {
        console.error('Error loading category by name:', error);
        showEmptyMessageFn(singleCategoryWrapper, 'Error loading category by name.');
    }
}