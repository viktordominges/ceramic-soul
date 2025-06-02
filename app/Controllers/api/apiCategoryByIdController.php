<?php

function apiCategoryByIdController($id) {
    try {
        // Получаем категорию по id
        $category = findCategoryById($id);

        // Если категория не найдена, возвращаем ошибку 404
        if (empty($category)) {
            return json_response(['error' => 'Category by id not found'], 404);
        }

        // Форматируем данные поста
        $formattedCategory = [
            'id' => (int)$category['id'],
            'name' => htmlspecialchars($category['name']),
            'description' => htmlspecialchars($category['description']),
            'image' => htmlspecialchars($category['image']),
            'posts_count' => (int)$category['posts_count']
        ];

        // Возвращаем данные категории в формате JSON
        return json_response($formattedCategory);

    } catch (InvalidArgumentException $e) {
        // Неверный id — вернем 400
        error_log('Invalid id: ' . $e->getMessage());
        return json_response(['error' => 'Invalid category id'], 400);

    } catch (RuntimeException $e) {
        // Проблемы с базой данных
        error_log('Category fetch error: ' . $e->getMessage());
        return json_response(['error' => 'Internal Server Error'], 500);

    } catch (Exception $e) {
        // Все остальные ошибки
        error_log('Unexpected error: ' . $e->getMessage());
        return json_response(['error' => 'Unexpected error'], 500);
    }
}