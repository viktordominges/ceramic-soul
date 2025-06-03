<?php

/**
 * Контроллер для обработки страницы категорий в админке
 * 
 * @return string HTML-код страницы категорий
 */
function adminCategoriesController() {
    // Сессия уже установлена в app/config/bootstrap.php, поэтому здесь не требуется

    requireAdmin(); // Проверяем, что пользователь администратор

    // Подготавливаем данные
    $data = [
        'title' => 'Admin Categories', // Заголовок страницы
        'description' => 'Manage your blog categories', // Описание страницы
        'content' => renderContent('admin-categories') // Загружаем контент из admin/categories.php
    ];
    
    // Возвращаем отрендеренный шаблон с данными
    return renderView('admin-layout', $data);
}