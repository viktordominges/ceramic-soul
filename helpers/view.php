<?php
/**
 * Функция для рендеринга представлений
 * @param string $viewName Имя представления
 * @param array $data Данные для передачи в представление
 * @return string Содержимое представления
 * @throws Exception Если файл представления не найден
 */

/**
 * Рендерит конкретный контент-блок
 */
function renderContent($viewName, $data = []) {
    $contentFile = VIEWS . "/{$viewName}.php";
    
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
    $templateFile = VIEWS . "/{$template}.php";
    
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