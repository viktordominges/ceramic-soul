<?php

/**
 * Контроллер для обработки страницы аутентификации
 * 
 * @return string HTML-код страницы аутентификации
 */
function loginController() {
    
    $data = [
        'title' => 'Login',
        'description' => 'Login page', 
        'content' => renderContent('login') 
    ];
    
    return renderView('layout', $data);
}