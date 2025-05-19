export function showEmptyMessage(container, message) {
    const msg = document.createElement('p');
    msg.classList.add('no-posts');
    msg.textContent = message ?? 'Постов пока нет.';
    container.appendChild(msg);
}
