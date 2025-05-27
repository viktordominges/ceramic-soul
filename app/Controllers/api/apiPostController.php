<?php

function apiPostController($slug) {
    try {
        // Получаем пост по slug
        $post = findPostBySlug($slug);

        // Если пост не найден, возвращаем ошибку 404
        if (empty($post)) {
            return json_response(['error' => 'Post not found'], 404);
        }

        // Форматируем данные поста
        $formattedPost = [
            'id' => (int)$post['id'],
            'title' => htmlspecialchars($post['title']),
            'description' => htmlspecialchars($post['description']),
            'text' => htmlspecialchars($post['text']),
            'image' => htmlspecialchars($post['image']),
            'slug' => htmlspecialchars($post['slug']),
            'created_at' => $post['created_at'],
            'updated_at' => $post['updated_at'] ?: null,
            'category' => $post['category'] ? htmlspecialchars($post['category']) : null,
            'comments_count' => (int)$post['comments_count']
        ];

        // Возвращаем данные поста в формате JSON
        return json_response($formattedPost);

    } catch (InvalidArgumentException $e) {
        // Неверный slug — вернем 400
        error_log('Invalid slug: ' . $e->getMessage());
        return json_response(['error' => 'Invalid slug'], 400);

    } catch (RuntimeException $e) {
        // Проблемы с базой данных
        error_log('Post fetch error: ' . $e->getMessage());
        return json_response(['error' => 'Internal Server Error'], 500);

    } catch (Exception $e) {
        // Все остальные ошибки
        error_log('Unexpected error: ' . $e->getMessage());
        return json_response(['error' => 'Unexpected error'], 500);
    }
}
