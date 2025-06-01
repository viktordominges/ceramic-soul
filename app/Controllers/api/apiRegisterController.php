<?php

function apiRegisterController() {
    try {
        // Проверка, что запрос — POST
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            return methodNotAllowedController();
        }
 
        // Извлечение данных из POST
        $username = trim($_POST['username'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';
        $role = $_POST['role'] ?? 'user';
        $avatar = $_FILES['avatar'] ?? null;
 
        // Попытка создать пользователя
        $success = createUser($username, $email, $password, $role, $avatar);

        if ($success) {
            return json_response(['message' => 'User registered successfully'], 201);
        } else {
            return json_response(['error' => 'Failed to create user'], 500);
        }

    } catch (InvalidArgumentException $e) {
        return json_response(['error' => $e->getMessage()], 400);

    } catch (RuntimeException $e) {
        return json_response(['error' => $e->getMessage()], 500);

    } catch (Exception $e) {
        // error_log("Unexpected error in registerUserController: " . $e->getMessage());
        return json_response(['error' => 'Unexpected error'], 500);
    }
}
