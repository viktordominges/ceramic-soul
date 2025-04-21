<?php

/**
 * Контроллер для обработки страницы О нас
 * 
 * @return string HTML-код страницы О нас
 */
function contactController() {
    
    $data = [
        'title' => 'Contact Us',
        'description' => 'Get in touch with us', 
        'content' => renderContent('contact') 
    ];
    
    return renderView('layout', $data);
}