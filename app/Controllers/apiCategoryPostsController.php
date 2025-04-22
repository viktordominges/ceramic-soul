<?php

function apiCategoryPostsController($slug) {
    try {
        $posts = findCategoryPosts($slug);

        error_log('Category Posts fetched for slug [' . $slug . ']: ' . print_r($posts, true));

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
                'updated_at' => $post['updated_at'] ?: null,
                'category' => $post['category_name'] ? htmlspecialchars($post['category_name']) : null
            ];
        }, $posts);

        return json_response($formattedPosts);

    } catch (InvalidArgumentException $e) {
        // Неверный slug — вернём 400
        error_log('Invalid slug: ' . $e->getMessage());
        return json_response(['error' => 'Invalid category slug'], 400);

    } catch (RuntimeException $e) {
        // Проблемы с базой данных
        error_log('Category post fetch error: ' . $e->getMessage());
        return json_response(['error' => 'Internal Server Error'], 500);

    } catch (Exception $e) {
        // Все остальные ошибки
        error_log('Unexpected error: ' . $e->getMessage());
        return json_response(['error' => 'Unexpected error'], 500);
    }
}
