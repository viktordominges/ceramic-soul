<?php

/**
 * Контроллер для обработки страницы О нас
 * 
 * @return string HTML-код страницы О нас
 */
function registerController() {
    
    $data = [
        'title' => 'Register',
        'description' => 'Registration page', 
        'content' => renderContent('register') 
    ];
    
    return renderView('layout', $data);
}