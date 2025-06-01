<?php

function apiAllUsersController() {

    try {
        $users = findAllUsers();

        if (empty($users)) {
            return json_response([], 200);
        }

        $formattedUsers = array_map(function($user) {
            return [
                'id' => (int)$user['id'],
                'username' => htmlspecialchars($user['username']),
                'email' => htmlspecialchars($user['email']),
                'role' => htmlspecialchars($user['role']),
                'created_at' => $user['created_at'],
                'updated_at' => $user['updated_at'] ?? null
            ];
        }, $users);

        return json_response($formattedUsers);

    } catch (Exception $e) {
        // error_log('Users error: ' . $e->getMessage());
        return json_response(['error' => 'Internal Server Error'], 500);
    }
}
