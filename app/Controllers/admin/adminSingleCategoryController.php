<?php

/**
 * Контроллер для обработки страницы одной категории в админке
 * 
 * @return string HTML-код страницы категории
 */
function adminSingleCategoryController() {
    // Подготавливаем данные
    $data = [
        'title' => 'Admin Single Category', // Заголовок страницы
        'description' => 'Manage your blog single category', // Описание страницы
        'content' => renderContent('admin-single-category') // Загружаем контент из admin/admin-single-category.php
    ];
    
    return renderView('admin-layout', $data);
}