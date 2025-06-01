<?php

function getPostsCount() {
    try {
        $db = connectDB();
        $sql = "SELECT COUNT(*) as total FROM posts";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $db = null;

        return (int) ($result['total'] ?? 0);
    } catch (PDOException $e) {
        error_log("Database error in getPostsCount: " . $e->getMessage());
        throw new RuntimeException('Failed to get post count');
    }
}


function findAllPosts() {
    try {
        $db = connectDB();
        $sql = "
            SELECT
                p.id, 
                p.title, 
                p.description,
                p.text, 
                p.image, 
                p.slug, 
                p.created_at, 
                p.updated_at,
                c.name AS category
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

function findPopularPosts() {
    try {
        $db = connectDB();
        $sql = "
            SELECT 
                p.id,
                p.title,
                p.description,
                p.text,
                p.image,
                p.slug,
                p.created_at,
                p.updated_at,
                c.name AS category,
                COUNT(com.id) AS comments_count
            FROM posts p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN comments com ON com.post_id = p.id
            GROUP BY p.id
            HAVING comments_count > 0
            ORDER BY comments_count DESC, p.created_at DESC
            LIMIT 5
        ";

        $stmt = $db->prepare($sql);
        $stmt->execute();
        $popularPosts = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $db = null;
        return $popularPosts ?: [];
    } catch (PDOException $e) {
        error_log("Database error in findPopularPosts: " . $e->getMessage());
        throw new RuntimeException('Failed to retrieve popular posts');
    }
}

function findCategoryPosts($name) {
    // Пример мягкой валидации: убираем опасные символы, но разрешаем буквы, пробелы, тире
    if (!preg_match('/^[\p{L}\p{N}\s\-]+$/u', $name)) {
        throw new InvalidArgumentException('Invalid category name format');
    }

    try {
        $db = connectDB();
        $sql = "
            SELECT
                p.id, 
                p.title, 
                p.description,
                p.text, 
                p.image, 
                p.slug, 
                p.created_at, 
                p.updated_at,
                c.name AS category
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
                p.description,
                p.text, 
                p.image, 
                p.slug, 
                p.created_at, 
                p.updated_at,
                c.name AS category,
                (
                    SELECT COUNT(*) 
                    FROM comments cm 
                    WHERE cm.post_id = p.id
                ) AS comments_count
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

function createPost(array $postData) {
    try {
        $db = connectDB();

        $sql = "
            INSERT INTO posts (title, description, text, image, slug, category_id)
            VALUES (:title, :description, :text, :image, :slug, :category_id)
        ";

        $stmt = $db->prepare($sql);

        $stmt->bindValue(':title', $postData['title'], PDO::PARAM_STR);
        $stmt->bindValue(':description', $postData['description'], PDO::PARAM_STR);
        $stmt->bindValue(':text', $postData['text'], PDO::PARAM_STR);
        $stmt->bindValue(':image', $postData['image'] ?? null, PDO::PARAM_STR); // может быть null
        $stmt->bindValue(':slug', $postData['slug'], PDO::PARAM_STR);
        $stmt->bindValue(':category_id', $postData['category_id'], PDO::PARAM_INT);

        $stmt->execute();

        return $db->lastInsertId();

    } catch (PDOException $e) {
        error_log("Database error in createPost: " . $e->getMessage());
        throw new RuntimeException('Failed to create post');
    }
}

