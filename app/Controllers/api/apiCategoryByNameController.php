<?php

function apiCategoryByNameController($name) {
    try {
        // Получаем категорию по name
        $category = findCategoryByName($name);

        // Если категория не найдена, возвращаем ошибку 404
        if (empty($category)) {
            return json_response(['error' => 'Category by name not found'], 404);
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
        // Неверный name — вернем 400
        // error_log('Invalid name: ' . $e->getMessage());
        return json_response(['error' => 'Invalid category name'], 400);

    } catch (RuntimeException $e) {
        // Проблемы с базой данных
        // error_log('Category fetch error: ' . $e->getMessage());
        return json_response(['error' => 'Internal Server Error'], 500);

    } catch (Exception $e) {
        // Все остальные ошибки
        // error_log('Unexpected error: ' . $e->getMessage());
        return json_response(['error' => 'Unexpected error'], 500);
    }
}