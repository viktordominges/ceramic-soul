<?php

function apiLogoutController() {
    // Запуск сессии
    // session_start();

    // Удаление всех данных сессии
    $_SESSION = [];

    // Удаление cookie сессии (если используется)
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params["path"],
            $params["domain"],
            $params["secure"],
            $params["httponly"]
        );
    }

    // Уничтожение сессии
    session_destroy();

    // Возврат JSON-ответа
    return json_response(['message' => 'Logout successful']);
}
