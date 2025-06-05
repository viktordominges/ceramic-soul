<?php

function apiSuperAdminRegisterController() {
    try {
        // Проверка, что запрос — POST
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            return methodNotAllowedController();
        }
 
        // Извлечение данных из POST
        $username = trim($_POST['username'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';
        $inputToken = $_POST['token'] ?? '';
        $role = 'admin';
        $avatar = $_FILES['avatar'] ?? null;

        // Проверка ввода секретного токена
        if (empty($inputToken)) {
            return json_response(['error' => 'Secret token is required'], 400);
        }

        // Получение константы SECRET_TOKEN из конфигурации
        $config = json_decode(file_get_contents(CONFIG . '/secretToken.json'), true);
        $secretToken = $config['token'] ?? '';

        // Проверка секретного токена
        if ($inputToken !== $secretToken) {
            return json_response(['error' => 'Invalid secret token'], 403);
        }
  
        // Попытка создать пользователя
        $success = createUser($username, $email, $password, $role, $avatar);

        if ($success) {
            return json_response(['success' => true, 'message' => 'User registered successfully'], 201);
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
 