<?php

/**
 * Контроллер для обработки страницы регистрации суперадминистратора
 * 
 * @return string HTML-код страницы регистрации суперадминистратора
 */
function superAdminRegisterController() {
    // Проверяем, авторизован ли суперадминистратор

    $data = [
        'title' => 'Superadmin Registration',
        'description' => 'Registration page for superadmin.',
        'content' => renderContent('superadmin-register')
    ];
    return renderView('empty-layout', $data);
}