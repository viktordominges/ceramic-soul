<?php

function apiAllPostsController() {
    try {
        $posts = findAllPosts();

        error_log('Posts fetched: ' . print_r($posts, true));

        if (empty($posts)) {
            return json_response([], 200);
        }

        $formattedPosts = array_map(function($post) {
            return [
                'id' => (int)$post['id'],
                'title' => htmlspecialchars($post['title']),
                'content' => htmlspecialchars($post['content']),
                'image' => htmlspecialchars($post['image']),
                'slug' => htmlspecialchars($post['slug']),
                'created_at' => $post['created_at'],
                'updated_at' => $post['updated_at'] ? $post['updated_at'] : null,
                'category' => $post['category_name'] ? htmlspecialchars($post['category_name']) : null
            ];
        }, $posts);

        return json_response($formattedPosts);

    } catch (Exception $e) {
        error_log('Posts error: ' . $e->getMessage());
        return json_response(['error' => 'Internal Server Error'], 500);
    }
}
