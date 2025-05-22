<?php

function apiLoginController() {
    try {
        // Проверка метода
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            return methodNotAllowedController();
        }

        // Получение данных из $_POST
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';

        if (empty($email) || empty($password)) {
            return json_response(['error' => 'Email and password are required.'], 400);
        }

        // Аутентификация пользователя
        $user = authenticateUser($email, $password);

        // Устанавливаем сессию
        session_start();
        $_SESSION['user'] = $user;

        return json_response([
            'message' => 'Login successful!',
            'user' => $user
        ]);

    } catch (InvalidArgumentException $e) {
        return json_response(['error' => $e->getMessage()], 401);

    } catch (RuntimeException $e) {
        return json_response(['error' => $e->getMessage()], 500);

    } catch (Exception $e) {
        error_log("Unexpected error in apiLoginController: " . $e->getMessage());
        return json_response(['error' => 'Unexpected server error'], 500);
    }
}
