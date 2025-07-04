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
        'update' => 'updateController',

        // API
        'api/categories' => 'apiAllCategoriesController',
        'api/posts' => 'apiAllPostsController',
        'api/posts/popular' => 'apiPopularPostsController',
        'api/users/register' => 'apiRegisterController',
        'api/users/login' => 'apiLoginController',
        'api/users/logout' => 'apiLogoutController',
        'api/users/delete' => 'apiDeleteAccountController',
        'api/users/update' => 'apiUpdateUserController',
        'api/users/current' => 'apiGetCurrentUserController',
        'api/comments/create' => 'apiCreateCommentController',
        'api/posts/create' => 'apiCreatePostController',
        'api/categories/create' => 'apiCreateCategoryController',

        // Admin panel pages
        'admin' => 'adminLoginController',
        'superadmin/register' => 'superAdminRegisterController',
        'admin/categories' => 'adminCategoriesController',
        'admin/category' => 'adminSingleCategoryController',
        'admin/posts' => 'adminPostsController',
        'admin/post' => 'adminSinglePostController',
        'admin/users' => 'adminUsersController',
        'admin/user' => 'adminSingleUserController',
        
        // Admin API
        'api/admin/stats' => 'apiAdminStatsController',
        'api/admin/users' => 'apiAllUsersController',
        'api/admin/login' => 'apiAdminLoginController',
        'api/admin/logout' => 'apiAdminLogoutController',
        'api/superadmin/register' => 'apiSuperAdminRegisterController',
    ];
}

/**
 * Main router function
 */
function router($uri) {
    $routes = get_routes();
    $uri = parse_url($uri, PHP_URL_PATH); // убрать ?query=string

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
                ($uri === 'api/superadmin/register' && $method === 'POST') ||
                ($uri === 'api/users/login' && $method === 'POST') ||
                ($uri === 'api/users/logout' && $method === 'POST') ||
                ($uri === 'api/users/delete' && $method === 'POST') ||
                ($uri === 'api/users/update' && $method === 'POST') ||
                ($uri === 'api/comments/create' && $method === 'POST') ||
                ($uri === 'api/posts/create' && $method === 'POST') ||
                ($uri === 'api/categories/create' && $method === 'POST') ||
                ($uri === 'api/admin/login' && $method === 'POST') ||
                ($uri === 'api/admin/logout' && $method === 'POST')
            ) {
                return $handler();
            }

            return methodNotAllowedController(); // 405
        }
    }

    // 2. Динамические маршруты (GET)
    if ($method === 'GET') {
        if (preg_match('#^api/posts/category/(\d+)$#', $uri, $matches)) {
            $id = (int)$matches[1];
            if (function_exists('apiCategoryPostsController')) {
                return apiCategoryPostsController($id);
            }
        }

        if (preg_match('#^api/categories/category/(\d+)$#', $uri, $matches)) {
            $id = (int)$matches[1];
            if (function_exists('apiCategoryByIdController')) {
                return apiCategoryByIdController($id);
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

        if (preg_match('#^api/comments/post/(\d+)$#', $uri, $matches)) {
            $postId = (int)$matches[1];
            if (function_exists('apiCommentsByPostController')) {
                return apiCommentsByPostController($postId);
            }
        }

        if (preg_match('#^api/comments/user/(\d+)$#', $uri, $matches)) {
            $userId = (int)$matches[1];
            if (function_exists('apiCommentsByUserController')) {
                return apiCommentsByUserController($userId);
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

        if (preg_match('#^api/categories/(\d+)/update$#u', $uri, $matches)) {
            $categoryId = (int)$matches[1];
            if (function_exists('apiUpdateCategoryController')) {
                return apiUpdateCategoryController($categoryId);
            }
        }

        if (preg_match('#^api/users/(\d+)/update$#u', $uri, $matches)) {
            $userId = (int)$matches[1];
            if (function_exists('apiUpdateUserByAdminController')) {
                return apiUpdateUserByAdminController($userId);
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

        if (preg_match('#^api/posts/(\d+)/delete$#', $uri, $matches)) {
            $postId = (int)$matches[1];
            if (function_exists('apiDeletePostController')) {
                return apiDeletePostController($postId);
            }
        }

        if (preg_match('#^api/categories/(\d+)/delete$#', $uri, $matches)) {
            $categoryId = (int)$matches[1];
            if (function_exists('apiDeleteCategoryController')) {
                return apiDeleteCategoryController($categoryId);
            }
        }

        if (preg_match('#^api/users/(\d+)/delete$#', $uri, $matches)) {
            $userId = (int)$matches[1];
            if (function_exists('apiDeleteUserByAdminController')) {
                return apiDeleteUserByAdminController($userId);
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
    }

    // 6. Маршрут не найден
    return notFoundController();
}
