<?php

/**
 * Контроллер для обработки страницы пользователей в админке
 * 
 * @return string HTML-код страницы пользователей
 */
function adminUsersController() {
    // Подготавливаем данные
    $data = [
        'title' => 'Admin Users', // Заголовок страницы
        'description' => 'Manage your blog users', // Описание страницы
        'content' => renderContent('admin-users') // Загружаем контент из admin/admin-users.php
    ];
    
    return renderView('admin-layout', $data);
}