export function prepareWrapper(parent, className) {
    // Если передана точка, убираем её
    const cleanClassName = className.startsWith('.') ? className.slice(1) : className;

    let wrapper = parent.querySelector(className);
    if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.classList.add(cleanClassName);
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

/**
 * Управляет открытием/закрытием dropdown-меню
 * @param {string} openTriggerClass - Класс триггера открытия меню
 * @param {string} menuClass - Класс dropdown-меню
 * @param {string} closeTriggerClass - Класс триггера закрытия меню
 */
export function toggleDropdownMenuTriggers(openTriggerClass, menuClass, closeTriggerClass) {
    const triggerOpen = document.querySelector(openTriggerClass);
    const dropdownMenu = document.querySelector(menuClass);
    const overlay = document.querySelector('.dropdown-overlay');

    // Проверка существования элементов
    if (!triggerOpen || !dropdownMenu || !overlay) {
        console.error('One of the required elements was not found.:', {
            triggerOpen,
            dropdownMenu,
            overlay
        });
        return;
    }

    const openMenu = () => {
        overlay.classList.add('active');
        dropdownMenu.classList.add('open');
        document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
    };

    const closeMenu = () => {
        dropdownMenu.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Восстанавливаем скролл
    };

    // Обработчики событий
    triggerOpen.addEventListener('click', (e) => {
        e.stopPropagation();
        if (dropdownMenu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    dropdownMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        if (e.target.classList.contains(closeTriggerClass)) {
            closeMenu();
        }
    });

    overlay.addEventListener('click', closeMenu);

    // Закрытие при клике вне меню
    document.addEventListener('click', (e) => {
        if (dropdownMenu.classList.contains('open') && 
            !dropdownMenu.contains(e.target) && 
            !triggerOpen.contains(e.target)) {
            closeMenu();
        }
    });

    // Закрытие при нажатии Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dropdownMenu.classList.contains('open')) {
            closeMenu();
        }
    });
}


/**
 * Добавляет ограничение по количеству символов для текстовых полей формы
 * @param {HTMLFormElement} form - сама форма
 * @param {Object} limits - объект вида { fieldName: maxLength }
 */
export function limitInputLengthWithCounter(form, limits) {
    for (const [name, maxLength] of Object.entries(limits)) {
        const field = form.querySelector(`[name="${name}"]`);
        if (!field) continue;

        // Создаем элемент для счётчика
        const counter = document.createElement('div');
        counter.className = 'input-counter';
        counter.style.fontSize = '0.85em';
        counter.style.color = '#666';
        counter.style.marginTop = '4px';

        field.insertAdjacentElement('afterend', counter);

        const updateCounter = () => {
            const remaining = maxLength - field.value.length;
            counter.textContent = `${remaining} characters left`;
        };

        // Ограничение и обновление счётчика при вводе
        field.addEventListener('input', () => {
            if (field.value.length > maxLength) {
                field.value = field.value.slice(0, maxLength);
            }
            updateCounter();
        });

        updateCounter(); // Первичная инициализация
    }
}
