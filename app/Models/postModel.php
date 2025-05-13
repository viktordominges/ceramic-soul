<?php


function findAllPosts() {
    try {
        $db = connectDB();
        $sql = "
            SELECT
                p.id, 
                p.title, 
                p.content, 
                p.image, 
                p.slug, 
                p.created_at, 
                p.updated_at,
                c.name AS category_name
            FROM posts p
            LEFT JOIN categories c ON p.category_id = c.id
            ORDER BY p.created_at DESC
        ";

        $stmt = $db->prepare($sql);
        $stmt->execute();
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $db = null;
        return $posts ?: [];
    } catch (PDOException $e) {
        error_log("Database error in findAllPosts: " . $e->getMessage());
        throw new RuntimeException('Failed to retrieve posts');
    }
}

function findCategoryPosts($name) {
    if (!preg_match('/^[a-z0-9-]+$/', $name)) {
        throw new InvalidArgumentException('Invalid category slug format');
    }

    try {
        $db = connectDB();
        $sql = "
            SELECT 
                p.id, 
                p.title, 
                p.content, 
                p.image, 
                p.slug, 
                p.created_at, 
                p.updated_at,
                c.name AS category_name
            FROM posts p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE c.name = :name
            ORDER BY p.created_at DESC
        ";
        $stmt = $db->prepare($sql);
        $stmt->execute([':name' => $name]);
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $db = null;
        return $posts ?: [];
    } catch (PDOException $e) {
        error_log("Database error in findCategoryPosts: " . $e->getMessage());
        throw new RuntimeException('Failed to retrieve category posts');
    }
}

function findPostBySlug($slug) {
    if (!preg_match('/^[a-z0-9-]+$/', $slug)) {
        throw new InvalidArgumentException('Invalid post slug format');
    }

    try {
        $db = connectDB();
        $sql = "
            SELECT 
                p.id, 
                p.title, 
                p.content, 
                p.image, 
                p.slug, 
                p.created_at, 
                p.updated_at,
                c.name AS category_name
            FROM posts p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.slug = :slug
        ";
        $stmt = $db->prepare($sql);
        $stmt->execute([':slug' => $slug]);
        $post = $stmt->fetch(PDO::FETCH_ASSOC);

        $db = null;
        return $post ?: null;
    } catch (PDOException $e) {
        error_log("Database error in findPostBySlug: " . $e->getMessage());
        throw new RuntimeException('Failed to retrieve post by slug');  
    }
}