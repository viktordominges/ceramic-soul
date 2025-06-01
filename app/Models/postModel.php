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
                p.created_at, 
                p.updated_at,
                c.name AS category,
                COUNT(cm.id) AS comments_count
            FROM posts p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN comments cm ON cm.post_id = p.id
            GROUP BY p.id, c.name
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

function getPostById($id) {
    if (!is_numeric($id) || $id < 1) {
        throw new InvalidArgumentException('Invalid post ID');
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
            WHERE p.id = :id
        ";

        $stmt = $db->prepare($sql);
        $stmt->execute([':id' => $id]);
        $post = $stmt->fetch(PDO::FETCH_ASSOC);

        $db = null;
        return $post ?: null;
    } catch (PDOException $e) {
        error_log("Database error in findPostById: " . $e->getMessage());
        throw new RuntimeException('Failed to retrieve post by ID');
    }
}


function createPost(array $postData) {
    try {
        $db = connectDB();

        $sql = "
            INSERT INTO posts (title, description, text, image, category_id)
            VALUES (:title, :description, :text, :image, :category_id)
        ";

        $stmt = $db->prepare($sql);

        $stmt->bindValue(':title', $postData['title'], PDO::PARAM_STR);
        $stmt->bindValue(':description', $postData['description'], PDO::PARAM_STR);
        $stmt->bindValue(':text', $postData['text'], PDO::PARAM_STR);
        $stmt->bindValue(':image', $postData['image'] ?? null, PDO::PARAM_STR); // может быть null
        $stmt->bindValue(':category_id', $postData['category_id'], PDO::PARAM_INT);
        $stmt->bindValue(':category_id', $postData['category_id'], PDO::PARAM_INT);

        $stmt->execute();

        return $db->lastInsertId();

    } catch (PDOException $e) {
        error_log("Database error in createPost: " . $e->getMessage());
        throw new RuntimeException('Failed to create post');
    }
}

function updatePostById($id, $data) {
    if (!is_numeric($id) || $id < 1) {
        throw new InvalidArgumentException('Invalid post ID');
    }

    $required = ['title', 'description', 'text', 'category_id'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            throw new InvalidArgumentException("Missing required field: $field");
        }
    }

    try {
        $db = connectDB();

        $sql = "
            UPDATE posts SET
                title = :title,
                description = :description,
                text = :text,
                image = :image,
                category_id = :category_id,
                updated_at = NOW()
            WHERE id = :id
        ";

        $stmt = $db->prepare($sql);
        $stmt->execute([
            ':title' => $data['title'],
            ':description' => $data['description'],
            ':text' => $data['text'],
            ':image' => $data['image'] ?? null,
            ':category_id' => $data['category_id'],
            ':id' => $id,
        ]);

        $db = null;
        return $stmt->rowCount() > 0;
    } catch (PDOException $e) {
        error_log("Database error in updatePostById: " . $e->getMessage());
        throw new RuntimeException('Failed to update post');
    }
}

function deletePostById($id)
{
    if (!is_numeric($id) || $id < 1) {
        throw new InvalidArgumentException('Invalid post ID');
    }

    try {
        $db = connectDB();

        $stmt = $db->prepare('DELETE FROM posts WHERE id = :id');
        $stmt->execute([':id' => $id]);

        return $stmt->rowCount() > 0;
    } catch (PDOException $e) {
        error_log("Database error in deletePostById: " . $e->getMessage());
        throw new RuntimeException('Failed to delete post');
    }
}

