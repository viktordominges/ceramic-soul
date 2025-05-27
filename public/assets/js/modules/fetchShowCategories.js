export async function fetchShowCategories({
    endpoint = '/api/categories',
    wrapper,
    renderItem,
    showEmptyMessageFn
}) {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Loading error: ${response.status}`);
        }

        const data = await response.json();
        const categories = Array.isArray(data) ? data : data.content;

        if (Array.isArray(categories) && categories.length) {
            categories.forEach(category => {
                wrapper.appendChild(renderItem(category));
            });
        } else {
            showEmptyMessageFn(wrapper, 'There are no categories yet.');
        }
    } catch (error) {
        console.error('Error loading categories:', error);
        showEmptyMessageFn(wrapper, 'Error loading categories.');
    }
}


