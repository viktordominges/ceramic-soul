<?php

function apiCreateCategoryController()
{
    try {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            return methodNotAllowedController();
        }

        $name = trim($_POST['name'] ?? '');
        $description = trim($_POST['description'] ?? '');

        if (!$name || !$description) {
            return json_response(['error' => 'All fields are required'], 400);
        }

        $imagePath = null;

        if (!empty($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = WWW . '/uploads/categories/';
            $fileName = uniqid() . '-' . basename($_FILES['image']['name']);
            $targetFile = $uploadDir . $fileName;

            if (!move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
                return json_response(['error' => 'Failed to upload image'], 500);
            }

            $imagePath = '/uploads/categories/' . $fileName;
        }

        $categoryId = createCategory([
            'name' => $name,
            'description' => $description,
            'image' => $imagePath,
        ]);

        return json_response(['success' => true, 'category_id' => $categoryId]);

    } catch (Exception $e) {
        error_log('Error in apiCreateCategoryController: ' . $e->getMessage());
        return json_response(['error' => 'Internal Server Error'], 500);
    }
}
