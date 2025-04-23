<?php

function findCategoryByName($name) {
    // Убедимся, что строка — это UTF-8
    if (!is_string($name) || !mb_check_encoding($name, 'UTF-8')) {
        throw new InvalidArgumentException('Invalid category name');
    }

    try {
        $db = connectDB();
        $sql = "SELECT id, name, slug FROM categories WHERE name = :name";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        error_log("Database error in findCategoryByName: " . $e->getMessage());
        throw new RuntimeException("Failed to retrieve category by name");
    }
}

function findAllCategories() {
    try {
        $db = connectDB();
        $sql = "SELECT id, name, image FROM categories";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        error_log("Database error in findAllCategories: " . $e->getMessage());
        throw new RuntimeException("Failed to retrieve all categories");
    }
}
