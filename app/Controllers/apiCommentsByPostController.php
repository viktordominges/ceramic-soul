<?php

function apiCommentsByPostController($slug) {
    try {
        // Проверка, что slug — это непустая строка
        if (empty($slug) || !is_string($slug)) {
            throw new InvalidArgumentException("Invalid post slug");
        }

        // Получаем комментарии по slug поста
        $comments = findCommentsByPostSlug($slug);

        error_log("Comments fetched for post slug [$slug]: " . print_r($comments, true));

        if (empty($comments)) {
            return json_response([], 200);
        }

        // Форматируем комментарии
        $formattedComments = array_map(function($comment) {
            return [
                'id' => (int)$comment['id'],
                'text' => htmlspecialchars($comment['text']),
                'username' => htmlspecialchars($comment['username']),
                'post_id' => (int)$comment['post_id'],
                'created_at' => $comment['created_at'],
                'updated_at' => $comment['updated_at'] ?: null
            ];
        }, $comments);

        json_response($formattedComments);

    } catch (InvalidArgumentException $e) {
        error_log("Invalid post slug: " . $e->getMessage());
        json_response(['error' => 'Invalid post slug'], 400);

    } catch (RuntimeException $e) {
        error_log("Database error in post comments fetch: " . $e->getMessage());
        json_response(['error' => 'Internal Server Error'], 500);

    } catch (Exception $e) {
        error_log("Unexpected error in post comments: " . $e->getMessage());
        json_response(['error' => 'Unexpected error'], 500);
    }
}

