export function prepareWrapper(parent, className) {
    let wrapper = parent.querySelector(className);
    if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.classList.add(className);
        parent.appendChild(wrapper);
    } else {
        wrapper.innerHTML = '';
    }
    return wrapper;
}

export function setActiveLink() {
    document.querySelectorAll('.header__nav a').forEach(link => {
        if(link.href === window.location.href) {
            link.classList.add('active');
        }
    });
}
    