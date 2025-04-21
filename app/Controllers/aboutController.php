<?php

/**
 * Контроллер для обработки страницы О нас
 * 
 * @return string HTML-код страницы О нас
 */
function aboutController() {
    
    $data = [
        'title' => 'About Us',
        'description' => 'Learn more about us', 
        'content' => renderContent('about') 
    ];
    
    return renderView('layout', $data);
}