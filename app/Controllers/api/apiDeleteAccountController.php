<?php

function apiDeleteAccountController() {
    // session_start();

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        return methodNotAllowedController();
    }

    // Проверка авторизации
    if (empty($_SESSION['user']) || empty($_SESSION['user']['id'])) {
        return json_response(['error' => 'Unauthorized.'], 401);
    }

    $userId = (int) $_SESSION['user']['id'];

    try {
        // Удаление пользователя
        deleteUser($userId);

        // Завершение сессии
        $_SESSION = [];
        session_destroy();

        return json_response(['message' => 'Account deleted successfully.']);

    } catch (RuntimeException $e) {
        return json_response(['error' => $e->getMessage()], 500);
    } catch (Exception $e) {
        // error_log("Unexpected error in apiDeleteAccountController: " . $e->getMessage());
        return json_response(['error' => 'Unexpected server error'], 500);
    }
}
