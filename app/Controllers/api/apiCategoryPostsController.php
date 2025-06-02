<?php

function apiCategoryPostsController($categoryId) {
    try {
        $posts = findCategoryPosts($categoryId);

        // error_log('Category Posts fetched for id [' . $categoryId . ']: ' . print_r($posts, true));

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
                'created_at' => $post['created_at'],
                'updated_at' => $post['updated_at'] ?: null,
                'category' => $post['category'] ? htmlspecialchars($post['category']) : null
            ];
        }, $posts);

        return json_response($formattedPosts);

    } catch (InvalidArgumentException $e) {
        // Неверный id — вернём 400
        error_log('Invalid category id: ' . $e->getMessage());
        return json_response(['error' => 'Invalid category id'], 400);

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
