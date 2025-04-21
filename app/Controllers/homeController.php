<?php

/**
 * Главный контроллер для обработки главной страницы
 * 
 * @return string HTML-код главной страницы
 */
function homeController() {
    // Подготавливаем данные
    $data = [
        'title' => 'Добро пожаловать на главную страницу',
        'content' => renderContent('home') // Загружаем контент из home-content.php
    ];
    
    return renderView('layout', $data);
}

/**
 * Рендерит конкретный контент-блок
 */
function renderContent($viewName, $data = []) {
    $contentFile = APP . "/Views/{$viewName}.php";
    
    if (!file_exists($contentFile)) {
        throw new Exception("Content file {$contentFile} not found");
    }
    
    extract($data);
    ob_start();
    include $contentFile;
    return ob_get_clean();
}

/**
 * Рендерит основной шаблон
 */
function renderView($template, $data = []) {
    $templateFile = APP . "/Views/{$template}.php";
    
    if (!file_exists($templateFile)) {
        throw new Exception("Template file {$templateFile} not found");
    }
    

    if (!is_array($data)) {
        throw new Exception("Data must be an array");
    }
    

    if (!file_exists($templateFile)) {
        throw new Exception("Template file {$templateFile} not found");
    }
    
    extract($data);
    ob_start();
    include $templateFile;
    return ob_get_clean();
}