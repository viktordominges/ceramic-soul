<?php

/**
 * Контроллер для обработки страницы одного поста в админке
 * 
 * @return string HTML-код страницы поста
 */
function adminSinglePostController() {
    // Подготавливаем данные
    $data = [
        'title' => 'Admin Single Post', // Заголовок страницы
        'description' => 'Manage your blog single post', // Описание страницы
        'content' => renderContent('admin-single-post') // Загружаем контент из admin/admin-single-post.php
    ];
    
    return renderView('admin-layout', $data);
}