export function showEmptyMessage(container, message) {
    const msg = document.createElement('p');
    msg.classList.add('no-posts');
    msg.textContent = message ?? 'There are no content yet.';
    container.appendChild(msg);
}
