<?php

function apiCreateCommentController() {
    try {
        // Проверка, что метод запроса — POST
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            return methodNotAllowedController();
        }

        // Проверка авторизации (должна быть активна сессия)
        session_start();
        if (!isset($_SESSION['user'])) {
            return json_response(['error' => 'Authorization required'], 401);
        }

        $input = json_decode(file_get_contents('php://input'), true); // Декодирование JSON

        $text = trim($input['text'] ?? '');
        $post_id = (int)($input['post_id'] ?? 0);

        // Получаем данные из POST-запроса
        // $text = trim($_POST['text'] ?? '');
        // $post_id = (int)($_POST['post_id'] ?? 0);
        $user_id = $_SESSION['user']['id'];

        // Простая валидация
        if (empty($text)) {
            return json_response(['error' => 'Comment cannot be empty'], 400);
        }

        if ($post_id <= 0) {
            return json_response(['error' => 'Invalid post ID'], 400);
        }

        // Создаём комментарий
        $success = createComment($text, $user_id, $post_id);
        
        if ($success) {
            return json_response(['message' => 'Comment successfully added'], 201);
        }

        return json_response(['error' => 'Failed to create comment'], 500);

    } catch (RuntimeException $e) {
        return json_response(['error' => $e->getMessage()], 500);
    } catch (Exception $e) {
        error_log("Unexpected error in apiCreateCommentController: " . $e->getMessage());
        return json_response(['error' => 'Unexpected error'], 500);
    }
}
