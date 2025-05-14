<?php

/**
 * Главный контроллер для обработки главной страницы
 * 
 * @return string HTML-код главной страницы
 */
function categoryController() {
    // Подготавливаем данные
    $data = [
        'title' => 'Category Page', // Заголовок страницы
        'description' => 'Welcome to the category page', // Описание страницы
        'content' => renderContent('category') // Загружаем контент из home.php
    ];
    
    return renderView('layout', $data);
}