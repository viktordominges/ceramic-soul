<?php

function apiUpdateUserByAdminController($id)
{
    try {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            return methodNotAllowedController();
        }

        // Проверка авторизации и прав (допиши свою логику доступа администратора)
        // if (empty($_SESSION['user']) || $_SESSION['user']['role'] !== 'admin') {
        //     return json_response(['error' => 'Forbidden'], 403);
        // }

        $id = (int)$id;
        if ($id < 1) {
            return json_response(['error' => 'Invalid user ID'], 400);
        }

        // Получение данных из формы
        $username = trim($_POST['username'] ?? '');
        $password = $_POST['password'] ?? '';
        $confirmPassword = $_POST['confirm_password'] ?? '';
        $avatar = $_FILES['avatar'] ?? null;

        // Проверка: пароли должны совпадать (если пароль задан)
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
        error_log("Unexpected error in updateUserByAdminController: " . $e->getMessage());
        return json_response(['error' => 'Unexpected error'], 500);
    }
}
