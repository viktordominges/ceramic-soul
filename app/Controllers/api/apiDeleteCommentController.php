<?php

function apiDeleteCommentController($id) {
    session_start();
    $userId = $_SESSION['user']['id'] ?? null;

    if (!$userId) {
        return json_response(['error' => 'Unauthorized'], 401);
    }

    $comment = findCommentById($id);
    if (!$comment) {
        return json_response(['error' => 'Comment not found'], 404);
    }

    if ($comment['user_id'] !== $userId) {
        return json_response(['error' => 'No rights to delete comment'], 403);
    }

    $success = deleteCommentById($id);
    return $success
        ? json_response(['success' => true])
        : json_response(['error' => 'Failed to delete comment'], 500);
}
