<?php

function apiPopularPostsController() {
    try {
        $posts = findPopularPosts();

        // error_log('Posts fetched: ' . print_r($posts, true));

        if (empty($posts)) {
            return json_response([], 200);
        }

        $formattedPosts = array_map(function($post) {
            return [
                'id' => (int)$post['id'],
                'title' => htmlspecialchars($post['title']),
                'description' => htmlspecialchars($post['description']),
                'text' => htmlspecialchars($post['text']),
                'image' => htmlspecialchars($post['image']),
                'slug' => htmlspecialchars($post['slug']),
                'created_at' => $post['created_at'],
                'updated_at' => $post['updated_at'] ? $post['updated_at'] : null,
                'category' => $post['category'] ? htmlspecialchars($post['category']) : null,
                'comments_count' => (int)$post['comments_count']
            ];
        }, $posts);
 
        return json_response($formattedPosts);

    } catch (Exception $e) {
        // error_log('Posts error: ' . $e->getMessage());
        return json_response(['error' => 'Internal Server Error'], 500);
    }
}