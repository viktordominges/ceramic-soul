<?php

function apiUpdateCommentController($commentId) {
    // session_start();
    $userId = $_SESSION['user']['id'] ?? null;

    if (!$userId) {
        return json_response(['error' => 'Unauthorized'], 401);
    }

    $comment = findCommentById($commentId);

    if (!$comment) {
        return json_response(['error' => 'Comment not found'], 404);
    }

    if ($comment['user_id'] !== $userId) {
        return json_response(['error' => 'No editing rights'], 403);
    }

    // Получить тело PUT-запроса
    $input = json_decode(file_get_contents('php://input'), true);
    $newText = trim($input['text'] ?? '');

    if (empty($newText)) {
        return json_response(['error' => 'Text cannot be empty'], 400);
    }

    $updated = updateCommentById($commentId, $newText);

    return $updated
        ? json_response(['success' => true])
        : json_response(['error' => 'Failed to update comment'], 500);
}