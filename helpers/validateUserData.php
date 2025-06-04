<?php

function validateUserData($username, $email, $password = null, $isPasswordRequired = true) {
    $errors = [];

    if (empty($username) || strlen($username) < 2) {
        $errors[] = "Username must be at least 3 characters long.";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }

    // Разделение проверки пароля на обязательный (при регистрации) и необязательный (при обновлении профиля)
    if ($isPasswordRequired) {
        if (empty($password)) {
            $errors[] = "Password is required.";
        } elseif (strlen($password) < 6) {
            $errors[] = "Password must be at least 6 characters long.";
        }
    } elseif (!empty($password) && strlen($password) < 6) {
        $errors[] = "Password must be at least 6 characters long.";
    }

    return $errors;
}

