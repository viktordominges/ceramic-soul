<?php

/**
 * Контроллер для обработки страницы постов в админке
 * 
 * @return string HTML-код страницы постов
 */
function adminPostsController() {
    // Подготавливаем данные
    $data = [
        'title' => 'Admin Posts', // Заголовок страницы
        'description' => 'Manage your blog posts', // Описание страницы
        'content' => renderContent('admin-posts') // Загружаем контент из admin/posts.php
    ];
    
    return renderView('admin-layout', $data);
}