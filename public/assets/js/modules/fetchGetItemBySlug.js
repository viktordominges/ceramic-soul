export async function fetchShowItemBySlug({
    slug,
    endpoint,
    wrapper,
    renderItemFn,
    showEmptyMessageFn,
    notFoundMessage = 'Item not found.',
    errorMessage = 'Error loading item.'
}) {
    try {
        const response = await fetch(`${endpoint}${encodeURIComponent(slug)}`);
        if (!response.ok) {
            throw new Error(`Loading error: ${response.status}`);
        }

        const item = await response.json();

        if (item) {
            wrapper.appendChild(renderItemFn(item));
        } else {
            showEmptyMessageFn(wrapper, notFoundMessage);
        }
    } catch (error) {
        console.error('Error loading item by slug:', error);
        showEmptyMessageFn(wrapper, errorMessage);
    }
}
