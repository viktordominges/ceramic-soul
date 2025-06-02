export async function fetchShowCategoryById(id, singleCategoryWrapper, renderItemFn, showEmptyMessageFn) {
    try {
        const response = await fetch(`/api/categories/category/${encodeURIComponent(id)}`);
        if (!response.ok) {
            throw new Error(`Loading error: ${response.status}`);
        }

        const category = await response.json();

        if (category) {
            singleCategoryWrapper.appendChild(renderItemFn(category));
        } else {
            showEmptyMessageFn(singleCategoryWrapper, 'Category by ID not found.');
        }
    } catch (error) {
        console.error('Error loading category by ID:', error);
        showEmptyMessageFn(singleCategoryWrapper, 'Error loading category by ID.');
    }
}