<?php

/**
 * Определение маршрутов
 */
function get_routes() {
    return [
        '' => 'homeController',
        'about' => 'aboutController',
        'contact' => 'contactController',
        'category' => 'categoryController',
        'api/users' => 'apiUsersController',
        'api/categories' => 'apiAllCategoriesController'
    ];
}
/**
 * Основная функция роутера
 */
function router($uri) {
    $routes = get_routes();
    
    // Нормализация URI (удаляем начальный и конечный слэш)
    $uri = trim($uri, '/');
    
    if (array_key_exists($uri, $routes)) {
        $handler = $routes[$uri];
        
        if (function_exists($handler)) {
            return $handler();
        }
    }
    
    // Если роут не найден
    return notFoundController();
}