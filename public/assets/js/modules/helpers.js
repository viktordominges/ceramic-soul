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

export function toggleDropdownMenuTriggers(openTriggerId, menuClass, closeTriggerClass) {
    const triggerOpen = document.getElementById(openTriggerId);
    const dropdownMenu = document.querySelector(menuClass);

    triggerOpen.addEventListener('click', function () {
        dropdownMenu.classList.toggle('open');
    });

    // Делегирование: ловим клик по крестику внутри меню
    dropdownMenu.addEventListener('click', function (e) {
        if (e.target.classList.contains(closeTriggerClass)) {
            dropdownMenu.classList.remove('open');
        }
    });

    // Закрытие при клике вне
    document.addEventListener('click', function (e) {
        if (!dropdownMenu.contains(e.target) && e.target !== triggerOpen) {
            dropdownMenu.classList.remove('open');
        }
    });
}
   