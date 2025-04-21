<?php

/**
 * Главный контроллер для обработки главной страницы
 * 
 * @return string HTML-код главной страницы
 */
function homeController() {
    // Подготавливаем данные
    $data = [
        'title' => 'Home Page', // Заголовок страницы
        'description' => 'Welcome to the home page', // Описание страницы
        'content' => renderContent('home') // Загружаем контент из home-content.php
    ];
    
    return renderView('layout', $data);
}
