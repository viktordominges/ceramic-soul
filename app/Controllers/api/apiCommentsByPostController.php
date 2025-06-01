<?php

function apiCommentsByPostController($id) {
    // file_put_contents('log.txt', "Контроллер apiCommentsByPostController вызван\n", FILE_APPEND);
    try {
        // Проверка, что id — это положительное целое число
        if (empty($id) || !is_int($id) || $id <= 0) {
            throw new InvalidArgumentException("Invalid post ID");
        }

        // Получаем комментарии по id поста
        $comments = findCommentsByPostId($id);

        // error_log("Comments fetched for post id [$id]: " . print_r($comments, true));

        if (empty($comments)) {
            return json_response([], 200);
        }

        // session_start();
        $currentUserId = isset($_SESSION['user']['id']) ? (int)$_SESSION['user']['id'] : null;


        // Форматируем комментарии
        $formattedComments = array_map(function($comment) use ($currentUserId) {
            return [
                'id' => (int)$comment['id'],
                'text' => htmlspecialchars($comment['text']),
                'username' => htmlspecialchars($comment['username']),
                'avatar' => $comment['avatar'] ? htmlspecialchars($comment['avatar']) : null, // <- добавим проверку на null
                'post_id' => (int)$comment['post_id'],
                'user_id' => (int)$comment['user_id'], // <- добавим user_id
                'is_owner' => $currentUserId && $comment['user_id'] == $currentUserId, // <- полезно для фронта (получаем Boolean)
                'created_at' => $comment['created_at'],
                'updated_at' => $comment['updated_at'] ?: null
            ];
        }, $comments);

        json_response($formattedComments);

    } catch (InvalidArgumentException $e) {
        // error_log("Invalid post id: " . $e->getMessage());
        json_response(['error' => 'Invalid post id'], 400);

    } catch (RuntimeException $e) {
        // error_log("Database error in post comments fetch: " . $e->getMessage());
        json_response(['error' => 'Internal Server Error'], 500);

    } catch (Exception $e) {
        // error_log("Unexpected error in post comments: " . $e->getMessage());
        json_response(['error' => 'Unexpected error'], 500);
    }
}

