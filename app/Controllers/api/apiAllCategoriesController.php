<?php
/**
 * Функция для рендеринга представлений
 * @param string $viewName Имя представления
 * @param array $data Данные для передачи в представление
 * @return string Содержимое представления
 * @throws Exception Если файл представления не найден
 */

function apiAllCategoriesController() {
    try {
        
        // Получаем категории
        $categories = findAllCategories();
        
        // Логируем полученные категории для отладки
        // error_log('Categories fetched: ' . print_r($categories, true));

        // Если категорий нет - возвращаем пустой массив вместо ошибки
        if (empty($categories)) {
            return json_response([], 200);
        }
        
        // Преобразуем массив категорий
        $formattedCategories = array_map(function($category) {
            return [
                'id' => (int)$category['id'],
                'name' => htmlspecialchars($category['name']),
                'description' => htmlspecialchars($category['description']),
                'image' => htmlspecialchars($category['image']),
                'post_count' => (int)$category['post_count']
            ];
        }, $categories);

        // Логируем форматированные категории для отладки
        // error_log('Formatted categories: ' . print_r($formattedCategories, true));
        
        // Возвращаем ответ с форматированными категориями
        return json_response($formattedCategories);
        
    } catch (Exception $e) {
        // Логируем ошибку
        // error_log('Categories error: ' . $e->getMessage());
        return json_response(['error' => 'Internal Server Error'], 500);
    }
}


