<?php

function validateUserData($username, $email, $password) {
    $errors = [];

    if (empty($username) || strlen($username) < 2) {
        $errors[] = "Username must be at least 3 characters long.";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }

    if (strlen($password) < 6) {
        $errors[] = "Password must be at least 6 characters long.";
    }

    return $errors;
}
