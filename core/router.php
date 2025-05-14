<?php

/**
 * Определение маршрутов
 */
function get_routes() {
    return [
        '' => 'homeController',
        'about' => 'aboutController',
        'categories' => 'categoriesController',
        'category' => 'categoryController',
        'post' => 'postController',
        'register' => 'registerController',
        'login' => 'loginController',
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
    
    // 2. Обработка динамического маршрута: /api/posts/category/{name}
    // router.php
    if (preg_match('#^api/posts/category/([\w%\-]+)$#u', $uri, $matches)) {
        $name = urldecode($matches[1]);

        if (function_exists('apiCategoryPostsController')) {
            return apiCategoryPostsController($name);
        }
    }


    if (preg_match('#^api/posts/post/([\w%\-]+)$#u', $uri, $matches)) {
        $slug = urldecode($matches[1]);

        if (function_exists('apiPostController')) {
            return apiPostController($slug);
        }
    }


    // 3. Маршрут не найден
    return notFoundController();
}