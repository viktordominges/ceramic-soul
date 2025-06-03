<?php

function requireAdmin() {
    if (empty($_SESSION['admin'])) {
        header('Location: /admin');
        exit;
    }
}

function requireAdminApi() {
    if (empty($_SESSION['admin'])) {
        http_response_code(401);
        echo 'Unauthorized';
        exit;
    }
}

// Проверяем, авторизован ли администратор
function isAdminAuthenticated() {
    if (isset($_SESSION['admin'])) {
        header('Location: /admin/posts');
        exit;
    }
}
