<?php

function apiDeleteCategoryController($id)
{
    try {
        if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
            return methodNotAllowedController();
        }

        if (!is_numeric($id) || $id < 1) {
            return json_response(['error' => 'Invalid category ID'], 400);
        }

        $deleted = deleteCategoryById($id);

        if (!$deleted) {
            return json_response(['error' => 'Category not found or already deleted'], 404);
        }

        return json_response(['success' => true]);
    } catch (Exception $e) {
        return json_response(['error' => 'Server error'], 500);
    }
}
