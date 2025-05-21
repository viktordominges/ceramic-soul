<?php

function createComment($text, $user_id, $post_id) {
    try {
        $db = connectDB();
        $sql = "
            INSERT INTO comments (text, user_id, post_id)
            VALUES (:text, :user_id, :post_id)
        ";

        $stmt = $db->prepare($sql);
        $stmt->bindParam(':text', $text, PDO::PARAM_STR);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->bindParam(':post_id', $post_id, PDO::PARAM_INT);
        $stmt->execute();
        $db = null;
        return true;
    } catch (PDOException $e) {
        error_log("Database error in createComment: " . $e->getMessage());
        throw new RuntimeException('Failed to create comment');
    }
}

function findCommentsByPostSlug($slug) {
    try {
        $db = connectDB();
        $sql = "
            SELECT 
                c.id,
                c.text,
                u.username,
                c.post_id,
                c.created_at,
                c.updated_at
            FROM comments c
            INNER JOIN users u ON c.user_id = u.id
            INNER JOIN posts p ON c.post_id = p.id
            WHERE p.slug = :slug
            ORDER BY c.created_at ASC
        ";

        $stmt = $db->prepare($sql);
        $stmt->bindParam(':slug', $slug, PDO::PARAM_STR);
        $stmt->execute();
        $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $comments ?: null;
    } catch (PDOException $e) {
        error_log("Database error in findCommentsByPostSlug: " . $e->getMessage());
        throw new RuntimeException('Failed to retrieve comments by post slug');
    }
}



function findCommentsByUserId($user_id) {
    try {
        $db = connectDB();
        $sql = "
            SELECT 
                c.id,
                c.text,
                c.user_id,
                c.post_id,
                p.title AS post_title,
                c.created_at,
                c.updated_at
            FROM comments c
            INNER JOIN posts p ON c.post_id = p.id
            WHERE c.user_id = :user_id
            ORDER BY c.created_at DESC
        ";

        $stmt = $db->prepare($sql);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();
        $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $comments ?: null;
    } catch (PDOException $e) {
        error_log("Database error in findCommentsByUserId: " . $e->getMessage());
        throw new RuntimeException('Failed to retrieve comments by user ID');
    }
}

