<?php

function apiDeleteUserByAdminController($userId) {

    requireAdminApi(); // Проверка, что админ авторизован 401 Unauthorized

    if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
        // Если метод не DELETE, возвращаем 405 Method Not Allowed
        return methodNotAllowedController();
    }

    // Проверка, что сессия — админская
    if ($_SESSION['admin']['role'] !== 'admin') {
        return json_response(['error' => 'Forbidden'], 403);
    }

    // Проверка, что ID пользователя корректен
    if ($userId <= 0) {
        return json_response(['error' => 'Invalid user ID'], 400);
    }

    // Защита от самоуничтожения, если нужно
    if ($userId === (int)$_SESSION['admin']['id']) {
        return json_response(['error' => 'You cannot delete your own admin account here'], 400);
    }

    try {
        deleteUser($userId); // твоя функция из модели

        return json_response(['success' => true, 'message' => 'User deleted']);

    } catch (RuntimeException $e) {
        return json_response(['error' => $e->getMessage()], 500);
    } catch (Exception $e) {
        return json_response(['error' => 'Unexpected server error'], 500);
    }
}
