<?php

/**
 * Контроллер для обработки страницы одного user в админке
 * 
 * @return string HTML-код страницы user
 */
function adminSingleUserController() {
    // Сессия уже установлена в app/config/bootstrap.php, поэтому здесь не требуется
    requireAdmin(); // Проверяем, что пользователь администратор (функция определена в app/config/checkAuth.php)
    // Подготавливаем данные
    $data = [
        'title' => 'Admin Single User', // Заголовок страницы
        'description' => 'Manage your blog single user', // Описание страницы
        'content' => renderContent('admin-single-user') // Загружаем контент из admin/admin-single-user.php
    ];
    
    return renderView('admin-layout', $data);
}