<?php

function apiUpdateUserController()
{
    try {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            return methodNotAllowedController();
        }

        //session_start();
        if (empty($_SESSION['user']['id'])) {
            return json_response(['error' => 'Unauthorized'], 401);
        }

        $id = (int)$_SESSION['user']['id'];

        // Получение данных из формы
        $username = trim($_POST['username'] ?? '');
        $password = $_POST['password'] ?? '';
        $confirmPassword = $_POST['confirm_password'] ?? '';
        $avatar = $_FILES['avatar'] ?? null;

        // Валидация: пароли должны совпадать (если пароль задан)
        if (!empty($password) && $password !== $confirmPassword) {
            return json_response(['error' => 'Passwords do not match'], 400);
        }

        // Обновление пользователя
        $result = updateUser($id, $username, $password, $avatar);

        return json_response(['success' => $result]);

    } catch (InvalidArgumentException $e) {
        return json_response(['error' => $e->getMessage()], 400);

    } catch (RuntimeException $e) {
        return json_response(['error' => $e->getMessage()], 500);

    } catch (Exception $e) {
        error_log("Unexpected error in updateUserController: " . $e->getMessage());
        return json_response(['error' => 'Unexpected error'], 500);
    }
}
