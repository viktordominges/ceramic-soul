<?php

function validateUserAvatar($avatarFile) {

    $avatarPath = null;
    
    if ($avatarFile && $avatarFile['error'] === UPLOAD_ERR_OK) {
        $allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        $fileType = mime_content_type($avatarFile['tmp_name']);

        if (!in_array($fileType, $allowedTypes)) {
            throw new InvalidArgumentException("Only JPG and PNG files are allowed.");
        }

        $ext = pathinfo($avatarFile['name'], PATHINFO_EXTENSION);
        $uniqueName = uniqid('avatar_', true) . '.' . $ext;
        $uploadDir = WWW . '/uploads/avatars/';
        $relativePath = '/uploads/avatars/' . $uniqueName;

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        if (!move_uploaded_file($avatarFile['tmp_name'], $uploadDir . $uniqueName)) {
            throw new RuntimeException("Failed to upload avatar.");
        }

        $avatarPath = $relativePath;
    }

    return $avatarPath;
}
