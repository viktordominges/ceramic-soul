<?php

function apiDeleteCommentController($id) {
    // session_start();
    error_log("SESSION user: " . print_r($_SESSION['user'], true));

    $user = $_SESSION['user'] ?? null;

    if (!$user || !isset($user['id'], $user['role'])) {
        return json_response(['error' => 'Unauthorized'], 401);
    }

    $userId = (int)$user['id'];
    $isAdmin = $user['role'] === 'admin';

    $comment = findCommentById($id);
    if (!$comment) {
        return json_response(['error' => 'Comment not found'], 404);
    }

    // Разрешить удаление: если это админ или автор комментария
    if (!$isAdmin && $comment['user_id'] !== $userId) {
        return json_response(['error' => 'No rights to delete comment'], 403);
    }

    $success = deleteCommentById($id);
    return $success
        ? json_response(['success' => true])
        : json_response(['error' => 'Failed to delete comment'], 500);
}
