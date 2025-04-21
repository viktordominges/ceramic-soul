document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/categories')
        .then(response => response.json())
        .then(data => {
            // Проверяем, что 'content' действительно содержит массив категорий
            if (Array.isArray(data.content)) {
                const categories = data.content;  // Извлекаем массив категорий
                const dropdownMenu = document.querySelector('.dropdown-menu');
                dropdownMenu.innerHTML = ''; // Очищаем
                categories.forEach(cat => {
                    const link = document.createElement('a');
                    link.href = `/category?slug=${cat.slug}`;
                    link.textContent = cat.name;
                    dropdownMenu.appendChild(link);
                });
            } else {
                console.error('Ожидался массив категорий в поле "content", но получен:', data);
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки категорий:', error);
        });
});
