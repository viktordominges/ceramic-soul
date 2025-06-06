<?php

/**
 * Главный контроллер для обработки страницы одного поста
 * 
 * @return string HTML-код страницы одного поста
 */
function postController() {
    // Подготавливаем данные
    $data = [
        'title' => 'Post Page', // Заголовок страницы
        'description' => 'Welcome to the post page', // Описание страницы
        'content' => renderContent('post') // Загружаем контент из post.php
    ];
    
    return renderView('layout', $data);
}