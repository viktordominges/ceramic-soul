<?php

function apiCategoryPostsController($categoryId) {
    try {
        // Проверяем существование категории
        $category = findCategoryById($categoryId);
        if (!$category) {
            return json_response(['error' => 'Category not found'], 404);
        }

        // Получаем посты
        $posts = findCategoryPosts($categoryId);
 
        $formattedPosts = array_map(function($post) {
            return [
                'id' => (int)$post['id'],
                'title' => htmlspecialchars($post['title']),
                'description' => htmlspecialchars($post['description']),
                'text' => htmlspecialchars($post['text']),
                'image' => htmlspecialchars($post['image']),
                'created_at' => $post['created_at'],
                'updated_at' => $post['updated_at'] ?: null,
                'category' => $post['category'] ? htmlspecialchars($post['category']) : null,
                'comments_count' => (int)$post['comments_count']
            ];
        }, $posts);

        // Возвращаем всегда массив постов + имя категории
        return json_response([
            'category' => htmlspecialchars($category['name']),
            'posts' => $formattedPosts
        ]);

    } catch (InvalidArgumentException $e) {
        error_log('Invalid category id: ' . $e->getMessage());
        return json_response(['error' => 'Invalid category id'], 400);

    } catch (RuntimeException $e) {
        error_log('Category post fetch error: ' . $e->getMessage());
        return json_response(['error' => 'Internal Server Error'], 500);

    } catch (Exception $e) {
        error_log('Unexpected error: ' . $e->getMessage());
        return json_response(['error' => 'Unexpected error'], 500);
    }
}
