<?php

/**
 * Контроллер для обработки страницы регистрации
 * 
 * @return string HTML-код страницы регистрации
 */
function registerController() {
    
    $data = [
        'title' => 'Register',
        'description' => 'Registration page', 
        'content' => renderContent('register') 
    ];
    
    return renderView('layout', $data);
}