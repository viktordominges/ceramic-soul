<?php

function apiUpdatePostController($id)
{
    try {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            return methodNotAllowedController();
        }

        if (!is_numeric($id) || $id < 1) {
            return json_response(['error' => 'Invalid post ID'], 400);
        }

        $title = trim($_POST['title'] ?? '');
        $description = trim($_POST['description'] ?? '');
        $text = trim($_POST['text'] ?? '');
        $categoryId = (int)($_POST['category_id'] ?? 0);

        if (!$title || !$description || !$text || !$categoryId) {
            return json_response(['error' => 'All fields are required'], 400);
        }

        // Получаем текущий пост, чтобы взять старую картинку при необходимости
        $post = getPostById($id);
        if (!$post) {
            return json_response(['error' => 'Post not found'], 404);
        }

        $imagePath = $post['image'] ?? null; // по умолчанию — старая картинка или null если картинки не было

        if (!empty($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = WWW . '/uploads/posts/';
            $fileName = uniqid() . '-' . basename($_FILES['image']['name']);
            $targetFile = $uploadDir . $fileName;

            if (!move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
                return json_response(['error' => 'Failed to upload image'], 500);
            }

            $imagePath = '/uploads/posts/' . $fileName;
        }

        $updated = updatePostById($id, [
            'title' => $title,
            'description' => $description,
            'text' => $text,
            'image' => $imagePath,
            'category_id' => $categoryId,
        ]);

        return json_response(['success' => $updated]);

    } catch (Exception $e) {
        return json_response(['error' => 'Unexpected error'], 500);
    }
}
 