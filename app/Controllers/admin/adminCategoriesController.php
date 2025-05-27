<?php

/**
 * Контроллер для обработки страницы постов в админке
 * 
 * @return string HTML-код страницы категорий
 */
function adminCategoriesController() {
    // Подготавливаем данные
    $data = [
        'title' => 'Admin Categories', // Заголовок страницы
        'description' => 'Manage your blog categories', // Описание страницы
        'content' => renderContent('admin-categories') // Загружаем контент из admin/categories.php
    ];
    
    return renderView('admin-layout', $data);
}