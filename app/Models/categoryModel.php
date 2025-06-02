<?php

function findCategoryById($id) {
    if (!is_int($id)) {
        throw new InvalidArgumentException('Invalid category ID');
    }

    try {
        $db = connectDB();

        $sql = "
            SELECT 
                c.id, 
                c.name, 
                c.description, 
                c.image, 
                COUNT(p.id) AS posts_count
            FROM categories c
            LEFT JOIN posts p ON p.category_id = c.id
            WHERE c.id = :id
            GROUP BY c.id, c.name, c.description, c.image
        ";

        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        $category = $stmt->fetch(PDO::FETCH_ASSOC);

        return $category ?: null;

    } catch (PDOException $e) {
        error_log("Database error in findCategoryById: " . $e->getMessage());
        throw new RuntimeException("Failed to retrieve category by ID");
    }
}



function findAllCategories() {
    try {
        $db = connectDB();
        $sql = "
            SELECT 
                c.id, 
                c.name, 
                c.description, 
                c.image,
                COUNT(p.id) AS post_count
            FROM categories c
            LEFT JOIN posts p ON p.category_id = c.id
            GROUP BY c.id, c.name, c.description, c.image
        ";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        error_log("Database error in findAllCategories: " . $e->getMessage());
        throw new RuntimeException("Failed to retrieve all categories");
    }
}


function getCategoriesCount() {
    try {
        $db = connectDB();
        $sql = "SELECT COUNT(*) as total FROM categories";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $db = null;

        return (int) ($result['total'] ?? 0);
    } catch (PDOException $e) {
        error_log("Database error in getCategoriesCount: " . $e->getMessage());
        throw new RuntimeException('Failed to get category count');
    }
}

function createCategory(array $categoryData) {
    try {
        $db = connectDB();

        $sql = "
            INSERT INTO categories (name, description, image)
            VALUES (:name, :description, :image)
        ";

        $stmt = $db->prepare($sql);

        $stmt->bindValue(':name', $categoryData['name'], PDO::PARAM_STR);
        $stmt->bindValue(':description', $categoryData['description'], PDO::PARAM_STR);
        $stmt->bindValue(':image', $categoryData['image'] ?? null, PDO::PARAM_STR); // может быть null


        $stmt->execute();

        return $db->lastInsertId();

    } catch (PDOException $e) {
        error_log("Database error in createCategory: " . $e->getMessage());
        throw new RuntimeException('Failed to create category');
    }
}

function updateCategoryById(int $id, array $categoryData): bool
{
    try {
        $db = connectDB();

        $sql = "
            UPDATE categories 
            SET name = :name, description = :description, image = :image
            WHERE id = :id
        ";

        $stmt = $db->prepare($sql);

        $stmt->bindValue(':name', $categoryData['name'], PDO::PARAM_STR);
        $stmt->bindValue(':description', $categoryData['description'], PDO::PARAM_STR);
        $stmt->bindValue(':image', $categoryData['image'] ?? null, PDO::PARAM_STR);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);

        return $stmt->execute();

    } catch (PDOException $e) {
        error_log("Database error in updateCategory: " . $e->getMessage());
        throw new RuntimeException('Failed to update category');
    }
}

function deleteCategoryById($id)
{
    if (!is_numeric($id) || $id < 1) {
        throw new InvalidArgumentException('Invalid category ID');
    }

    try {
        $db = connectDB();

        $stmt = $db->prepare('DELETE FROM categories WHERE id = :id');
        $stmt->execute([':id' => $id]);

        return $stmt->rowCount() > 0;
    } catch (PDOException $e) {
        error_log("Database error in deleteCategoryById: " . $e->getMessage());
        throw new RuntimeException('Failed to delete category');
    }
}