export async function adminFetchShowStats() {
    try {
        const res = await fetch('/api/admin/stats');

        if (!res.ok) {
            throw new Error(`Ошибка HTTP: ${res.status}`);
        }

        const data = await res.json();

        const postEl = document.querySelector('.post-count');
        const categoryEl = document.querySelector('.category-count');
        const userEl = document.querySelector('.user-count');

        if (postEl) postEl.textContent = data.postCount ?? 0;
        if (categoryEl) categoryEl.textContent = data.categoryCount ?? 0;
        if (userEl) userEl.textContent = data.userCount ?? 0;

    } catch (err) {
        console.error('Ошибка при загрузке статистики:', err);
    }
}
