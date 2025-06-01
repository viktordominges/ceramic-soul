<?php

function apiAllPostsController() {
    try {
        $posts = findAllPosts();

        // error_log('Posts fetched: ' . print_r($posts, true));

        if (empty($posts)) {
            return json_response([], 200);
        }

        $formattedPosts = array_map(function($post) {
            return [
                'id' => (int)($post['id'] ?? 0),
                'title' => htmlspecialchars($post['title'] ?? '', ENT_QUOTES, 'UTF-8'),
                'description' => htmlspecialchars($post['description'] ?? '', ENT_QUOTES, 'UTF-8'),
                'text' => htmlspecialchars($post['text'] ?? '', ENT_QUOTES, 'UTF-8'),
                'image' => htmlspecialchars($post['image'] ?? '', ENT_QUOTES, 'UTF-8'),
                'created_at' => $post['created_at'] ?? null,
                'updated_at' => $post['updated_at'] ?? null,
                'category' => isset($post['category']) ? htmlspecialchars($post['category'], ENT_QUOTES, 'UTF-8') : null,
                'comments_count' => (int)($post['comments_count'] ?? 0)
            ];
        }, $posts);

        return json_response($formattedPosts);

    } catch (Exception $e) {
        // error_log('Posts error: ' . $e->getMessage());
        return json_response(['error' => 'Internal Server Error'], 500);
    }
}
