<?php

/**
 * Определение маршрутов
 */
function get_routes() {
    return [
        '' => 'homeController',
        'about' => 'aboutController',
        'categories' => 'categoriesController',
        'register' => 'registerController',
        'api/users' => 'apiUsersController',
        'api/categories' => 'apiAllCategoriesController',
        'api/posts' => 'apiAllPostsController'
    ];
}
/**
 * Основная функция роутера
 */
function router($uri) {
    $routes = get_routes();
    
    // Нормализация URI (удаляем начальный и конечный слэш)
    $uri = trim($uri, '/');

    // 1. Проверка обычных маршрутов
    if (array_key_exists($uri, $routes)) {
        $handler = $routes[$uri];

        if (function_exists($handler)) {
            return $handler();
        }
    }
    
    // 2. Обработка динамического маршрута: /api/posts/category/{slug}
    if (preg_match('#^api/posts/category/([a-z0-9-]+)$#', $uri, $matches)) {
        $slug = $matches[1];

        if (function_exists('apiCategoryPostsController')) {
            return apiCategoryPostsController($slug);
        }
    }

    // 3. Маршрут не найден
    return notFoundController();
}