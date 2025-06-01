<?php

/**
 * Определение маршрутов
 */
function get_routes() {
    return [
        // Pages
        '' => 'homeController',
        'about' => 'aboutController',
        'categories' => 'categoriesController',
        'category' => 'categoryController',
        'post' => 'postController',
        'register' => 'registerController',
        'login' => 'loginController',
        
        // API
        'api/categories' => 'apiAllCategoriesController',
        'api/posts' => 'apiAllPostsController',
        'api/posts/popular' => 'apiPopularPostsController',
        'api/users/register' => 'apiRegisterController',
        'api/users/login' => 'apiLoginController',
        'api/users/logout' => 'apiLogoutController',
        'api/users/delete' => 'apiDeleteAccountController',
        'api/comments/create' => 'apiCreateCommentController',
        'api/posts/create' => 'apiCreatePostController',

        // Admin panel pages
        // 'admin' => 'adminController',
        // 'admin/register' => 'adminRegisterController',
        'admin/categories' => 'adminCategoriesController',
        'admin/category' => 'adminSingleCategoryController',
        'admin/posts' => 'adminPostsController',
        'admin/post' => 'adminSinglePostController',
        'admin/users' => 'adminUsersController',
        'admin/user' => 'adminSingleUserController',
        

        // Admin API
        'api/admin/stats' => 'apiAdminStatsController',
        'api/admin/users' => 'apiAllUsersController',
    ];
}

/**
 * Основная функция роутера
 */
function router($uri) {
    $routes = get_routes();
    $uri = parse_url($uri, PHP_URL_PATH); // убрать ?query=string
    $uri = trim($uri, '/');
    dump($uri);
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    dump($method, 'method');

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
                ($uri === 'api/users/login' && $method === 'POST') ||
                ($uri === 'api/users/logout' && $method === 'POST') ||
                ($uri === 'api/users/delete' && $method === 'POST') ||
                ($uri === 'api/comments/create' && $method === 'POST') ||
                ($uri === 'api/posts/create' && $method === 'POST')
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

        if (preg_match('#^api/categories/category/([\w%\-]+)$#u', $uri, $matches)) {
            $name = urldecode($matches[1]);
            if (function_exists('apiCategoryByNameController')) {
                return apiCategoryByNameController($name);
            }
        }

        if (preg_match('#^api/users/user/(\d+)$#', $uri, $matches)) {
            $id = (int)$matches[1];
            if (function_exists('apiUserByIdController')) {
                return apiUserByIdController($id);
            }
        }

        if (preg_match('#^api/posts/id/(\d+)$#', $uri, $matches)) {
            $id = (int)$matches[1];
            if (function_exists('apiGetPostByIdController')) {
                return apiGetPostByIdController($id);
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

    // 3. Динамические маршруты (POST)
    if ($method === 'POST') {
        if (preg_match('#^api/posts/(\d+)/update$#', $uri, $matches)) {
            $postId = (int)$matches[1];
            if (function_exists('apiUpdatePostController')) {
                return apiUpdatePostController($postId);
            }
        }
    }


    // 4. Динамические маршруты (DELETE)
    if ($method === 'DELETE') {
        if (preg_match('#^api/comments/(\d+)/delete$#', $uri, $matches)) {
            $commentId = (int)$matches[1];
            if (function_exists('apiDeleteCommentController')) {
                return apiDeleteCommentController($commentId);
            }
        }
    }

    // 5. Динамические маршруты (PUT)
    if ($method === 'PUT') {
        if (preg_match('#^api/comments/(\d+)/update$#', $uri, $matches)) {
            $commentId = (int)$matches[1];
            if (function_exists('apiUpdateCommentController')) {
                return apiUpdateCommentController($commentId);
            }
        }

        if (preg_match('#^api/posts/(\d+)/update$#', $uri, $matches)) {
            $postId = (int)$matches[1];
            if (function_exists('apiUpdatePostController')) {
                return apiUpdatePostController($postId);
            }
        }
    }

    // 6. Маршрут не найден
    return notFoundController();
}
