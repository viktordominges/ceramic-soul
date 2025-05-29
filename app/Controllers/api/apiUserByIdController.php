<?php

function apiUserByIdController($id) {
    try {
        // Проверяем id на валидность
        if (!is_numeric($id) || (int)$id < 1) {
            throw new InvalidArgumentException("Invalid user ID");
        } 
        // Получаем user по id
        $user = findUserById($id);

        // Если user не найден, возвращаем ошибку 404
        if (empty($user)) {
            return json_response(['error' => 'User by id not found'], 404);
        }

        // Форматируем данные user
        $formattedUser = [
            'id' => (int)$user['id'],
            'username' => htmlspecialchars($user['username'], ENT_QUOTES, 'UTF-8'),
            'email' => htmlspecialchars($user['email'], ENT_QUOTES, 'UTF-8'),
            'role' => htmlspecialchars($user['role'], ENT_QUOTES, 'UTF-8'),
            'avatar' => htmlspecialchars($user['avatar'], ENT_QUOTES, 'UTF-8'),
            'created_at' => htmlspecialchars($user['created_at'], ENT_QUOTES, 'UTF-8'),
            'updated_at' => htmlspecialchars($user['updated_at'], ENT_QUOTES, 'UTF-8')
        ];


        // Возвращаем данные user в формате JSON
        return json_response($formattedUser);

    } catch (InvalidArgumentException $e) {
        // Неверный id — вернем 400
        error_log('Invalid id: ' . $e->getMessage());
        return json_response(['error' => 'Invalid user id'], 400);

    } catch (RuntimeException $e) {
        // Проблемы с базой данных
        error_log('User fetch error: ' . $e->getMessage());
        return json_response(['error' => 'Internal Server Error'], 500);

    } catch (Exception $e) {
        // Все остальные ошибки
        error_log('Unexpected error: ' . $e->getMessage());
        return json_response(['error' => 'Unexpected error'], 500);
    }
}