<?php

function apiCommentsByUserController($user_id) {
    try {
        if (!is_numeric($user_id) || (int)$user_id < 1) {
            throw new InvalidArgumentException("Invalid user ID");
        } 

        $comments = findCommentsByUserId((int)$user_id);

        if (empty($comments)) {
            return json_response([], 200);
        }

        $formattedComments = array_map(function($comment) {
            return [
                'id' => (int)$comment['id'],
                'text' => htmlspecialchars($comment['text']),
                'user_id' => (int)$comment['user_id'],
                'post_title' => isset($comment['post_title']) 
                    ? htmlspecialchars($comment['post_title']) 
                    : null,
                'created_at' => $comment['created_at'],
                'updated_at' => $comment['updated_at'] ?: null
            ];
        }, $comments);

        return json_response($formattedComments);

    } catch (InvalidArgumentException $e) {
        // error_log("Invalid user_id: " . $e->getMessage());
        return json_response(['error' => 'Invalid user ID'], 400);

    } catch (RuntimeException $e) {
        // error_log("Database error in user comments fetch: " . $e->getMessage());
        return json_response(['error' => 'Internal Server Error'], 500);

    } catch (Exception $e) {
        // error_log("Unexpected error in user comments: " . $e->getMessage());
        return json_response(['error' => 'Unexpected error'], 500);
    }
}

