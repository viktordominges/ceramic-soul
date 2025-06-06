<?php

/**
 * Контроллер для обработки страницы обновления профиля
 * 
 * @return string HTML-код страницы обновления профиля
 */
function updateController() {

    $data = [
        'title' => 'Update Profile',
        'description' => 'Profile update page', 
        'content' => renderContent('updateUser') 
    ];
    
    return renderView('layout', $data);
}