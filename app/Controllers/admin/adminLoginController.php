<?php

/**
 * Контроллер для обработки страницы авторизации администратора
 * 
 * @return string HTML-код страницы авторизации администратора
 */
function adminLoginController() {
    // Проверяем, авторизован ли администратор
    // Если администратор уже авторизован, перенаправляем на страницу управления постами
    isAdminAuthenticated();
    
    $data = [
        'title' => 'Admin Login',
        'description' => 'Login page for administrators.',
        'content' => renderContent('admin-login')
    ];
    return renderView('empty-layout', $data);
}
