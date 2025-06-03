<?php

/**
 * Контроллер для обработки страницы постов в админке
 * 
 * @return string HTML-код страницы постов
 */
function adminPostsController() {
    // Сессия уже установлена в app/config/bootstrap.php, поэтому здесь не требуется

    requireAdmin(); // Проверяем, что пользователь администратор

    // Подготавливаем данные
    $data = [
        'title' => 'Admin Posts', // Заголовок страницы
        'description' => 'Manage your blog posts', // Описание страницы
        'content' => renderContent('admin-posts') // Загружаем контент из admin/posts.php
    ];
    
    // Возвращаем отрендеренный шаблон с данными
    return renderView('admin-layout', $data);
}