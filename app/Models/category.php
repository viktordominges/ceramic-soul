<?php


function findcategoryBySlug($slug) {
    if (!preg_match('/^[a-z0-9-]+$/', $slug)) {
        return null; // или выбросить исключение / вернуть 404
    }
    $db = connectDB();
    $sql = "SELECT id, name, slug FROM categories WHERE slug = :slug";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':slug', $slug);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function findAllCategories() {
    $db = connectDB();
    $sql = "SELECT id, name, slug FROM categories";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
