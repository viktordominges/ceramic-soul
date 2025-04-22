export function showEmptyMessage(container) {
    const msg = document.createElement('p');
    msg.classList.add('no-posts');
    msg.textContent = 'Постов пока нет.';
    container.appendChild(msg);
}
