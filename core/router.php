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
        'api/categories' => 'apiAllCategoriesController',
        'api/posts' => 'apiAllPostsController',
        'api/users/register' => 'apiRegisterController',
        'api/users/login' => 'apiLoginController'

    ];
}
/**
 * Основная функция роутера
 */
function router($uri) {
    $routes = get_routes();
    $uri = trim($uri, '/');
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

    // 1. Проверка обычных маршрутов
    if (array_key_exists($uri, $routes)) {
    $handler = $routes[$uri];

    if (function_exists($handler)) {
        // Разрешаем:
        // - GET-запросы на все страницы
        // - POST-запросы на конкретные API-маршруты
        if (
            $method === 'GET' ||
            ($uri === 'api/users/register' && $method === 'POST') ||
            ($uri === 'api/users/login' && $method === 'POST')
        ) {
            return $handler();
        }

        return methodNotAllowedController(); // 405
    }
}


    // 2. Динамические маршруты (GET)
    if ($method === 'GET') {
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

        if (preg_match('#^api/comments/post/([\w%-]+)$#u', $uri, $matches)) {
            $slug = urldecode($matches[1]);
            if (function_exists('apiCommentsByPostController')) {
                return apiCommentsByPostController($slug);
            }
        }

        if (preg_match('#^api/comments/user/(\d+)$#', $uri, $matches)) {
            $user_id = (int)$matches[1];
            if (function_exists('apiCommentsByUserController')) {
                return apiCommentsByUserController($user_id);
            }
        }
    }

    // 3. Маршрут не найден
    return notFoundController();
}
