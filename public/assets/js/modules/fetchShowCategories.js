export async function fetchShowCategories(wrapper, renderItem, showEmptyMessageFn) {
    try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.status}`);
        }

        const data = await response.json();
        const categories = Array.isArray(data) ? data : data.content;

        if (Array.isArray(categories) && categories.length) {
            categories.forEach(category => {
                wrapper.appendChild(renderItem(category));
            });
        } else {
            showEmptyMessageFn(wrapper, 'Категорий пока нет.');
        }
    } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
        showEmptyMessageFn(wrapper, 'Ошибка загрузки категорий.');
    }
}

