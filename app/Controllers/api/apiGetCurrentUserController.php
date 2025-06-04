<?php

function apiGetCurrentUserController() {
    try {
        //session_start();

        if (empty($_SESSION['user']['id'])) {
            return json_response(['error' => 'Unauthorized'], 401);
        }

        $userId = (int)$_SESSION['user']['id'];
        $user = findUserById($userId);

        if (!$user) {
            return json_response(['error' => 'User not found'], 404);
        }

        // Отправляем отфильтрованные данные
        return json_response([
            'id' => $user['id'],
            'username' => htmlspecialchars($user['username'], ENT_QUOTES, 'UTF-8'),
            'email' => htmlspecialchars($user['email'], ENT_QUOTES, 'UTF-8'),
            'role' => $user['role'],
            'avatar' => $user['avatar'],
            'created_at' => $user['created_at'],
            'updated_at' => $user['updated_at']
        ]);

    } catch (Exception $e) {
        error_log('Error in apiCurrentUserController: ' . $e->getMessage());
        return json_response(['error' => 'Unexpected error'], 500);
    }
}
