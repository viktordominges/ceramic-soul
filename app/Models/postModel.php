<?php

function findAllPosts() {
    $db = connectDB();
    $sql = "
        SELECT 
            posts.id, 
            posts.title, 
            posts.content, 
            posts.image, 
            posts.slug, 
            posts.created_at, 
            posts.updated_at,
            categories.name AS category_name
        FROM posts
        LEFT JOIN categories ON posts.category_id = categories.id
    ";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
