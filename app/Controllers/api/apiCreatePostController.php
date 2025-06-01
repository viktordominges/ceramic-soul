<?php

function apiCreatePostController()
{
    try {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            return methodNotAllowedController();
        }

        // Получение данных из формы
        $title = trim($_POST['title'] ?? '');
        $description = trim($_POST['description'] ?? '');
        $text = trim($_POST['text'] ?? '');
        $categoryId = (int)($_POST['category_id'] ?? 0);

        // Валидация
        if (!$title || !$description || !$text || !$categoryId) {
            return json_response(['error' => 'All fields are required'], 400);
        }

        // Обработка изображения
        $imagePath = null;
        if (!empty($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = WWW . '/uploads/posts/';
            $fileName = uniqid() . '-' . basename($_FILES['image']['name']);
            $targetFile = $uploadDir . $fileName;

            if (!move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
                return json_response(['error' => 'Failed to upload image'], 500);
            }

            // Относительный путь, который можно использовать на клиенте
            $imagePath = '/uploads/posts/' . $fileName;
        }

        // Сохранение в БД
        $postId = createPost([
            'title' => $title,
            'description' => $description,
            'text' => $text,
            'image' => $imagePath,
            'category_id' => $categoryId,
        ]);

        if (ob_get_length()) {
            file_put_contents(__DIR__ . '/../../logs/output_buffer.log', ob_get_contents());
            ob_clean(); // очищает все, что уже было отправлено до JSON
        }
        return json_response(['success' => true, 'post_id' => $postId]);

    } catch (RuntimeException $e) {
        if (ob_get_length()) {
            file_put_contents(__DIR__ . '/../../logs/output_buffer.log', ob_get_contents());
            ob_clean(); // очищает все, что уже было отправлено до JSON
        }
        return json_response(['error' => $e->getMessage()], 500);
    } catch (Exception $e) {
        error_log('Unexpected error in apiCreatePostController: ' . $e->getMessage());
        return json_response(['error' => 'Unexpected error'], 500);
    }
}
