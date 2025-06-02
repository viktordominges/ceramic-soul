<?php

function apiUpdateCategoryController($id)
{
    try {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            return methodNotAllowedController();
        }

        $id = (int)$id;
        $newName = trim($_POST['name'] ?? '');
        $description = trim($_POST['description'] ?? '');

        if (!$newName || !$description) {
            return json_response(['error' => 'Name and description required'], 400);
        }

        $category = findCategoryById($id);
        if (!$category) {
            return json_response(['error' => 'Category not found'], 404);
        }

        $imagePath = $category['image'] ?? null;
        if (!empty($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = WWW . '/uploads/categories/';
            if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

            $fileName = uniqid() . '-' . basename($_FILES['image']['name']);
            $targetFile = $uploadDir . $fileName;

            if (!move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
                return json_response(['error' => 'Image upload failed'], 500);
            }

            $imagePath = '/uploads/categories/' . $fileName;
        }

        $updated = updateCategoryById($id, [
            'name' => $newName,
            'description' => $description,
            'image' => $imagePath,
        ]);

        return json_response(['success' => $updated]);

    } catch (Exception $e) {
        error_log("Update category error: " . $e->getMessage());
        return json_response(['error' => 'Unexpected error'], 500);
    }
}
