<?php

function createUser($username, $email, $password, $role = 'user', $avatar = null) {

    // Валидация входных данных
    $validationErrors = validateUserData($username, $email, $password);
    if (!empty($validationErrors)) {
        // Можно кинуть исключение или вернуть ошибки, в зависимости от логики проекта
        throw new InvalidArgumentException(implode(" ", $validationErrors));
    }

    // Проверка загруженного аватара на соответствие расширению, загрузка файла аватара в папку uploads/avatars и обработка в url 
    $avatarPath = null;
    if ($avatar !== null) {
        $avatarPath = validateUserAvatar($avatar);
    }

    try {
        $db = connectDB();

        // Проверка на уникальность email
        $checkSql = "SELECT COUNT(*) FROM users WHERE email = :email";
        $checkStmt = $db->prepare($checkSql);
        $checkStmt->bindParam(':email', $email, PDO::PARAM_STR);
        $checkStmt->execute();
        if ($checkStmt->fetchColumn() > 0) {
            throw new InvalidArgumentException("Email is already registered.");
        }

        $sql = "
            INSERT INTO users (username, email, password, role, avatar)
            VALUES (:username, :email, :password, :role, :avatar)
        ";

        $stmt = $db->prepare($sql);
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':password', $hashedPassword, PDO::PARAM_STR);
        $stmt->bindParam(':avatar', $avatarPath, PDO::PARAM_STR);
        $stmt->bindParam(':role', $role, PDO::PARAM_STR);

        $stmt->execute();
        $db = null;
        return true;
    } catch (PDOException $e) {
        error_log("Database error in createUser: " . $e->getMessage());
        throw new RuntimeException('Failed to create user');
    }
}



function updateUserPassword($id, $newPassword) {
    try {
        $db = connectDB();
        $sql = "
            UPDATE users
            SET password = :password
            WHERE id = :id
        ";

        $stmt = $db->prepare($sql);
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $stmt->bindParam(':password', $hashedPassword, PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        $stmt->execute();
        $db = null;
        return true;
    } catch (PDOException $e) {
        error_log("Database error in updateUserPassword: " . $e->getMessage());
        throw new RuntimeException('Failed to update user password');
    }
}


function deleteUser($id) {
    try {
        $db = connectDB();
        $sql = "DELETE FROM users WHERE id = :id";

        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        $stmt->execute();
        $db = null;
        return true;
    } catch (PDOException $e) {
        error_log("Database error in deleteUser: " . $e->getMessage());
        throw new RuntimeException('Failed to delete user');
    }
}


function findAllUsers() {
    try {
        $db = connectDB();
        $sql = "
            SELECT 
                id,
                username,
                email,
                role,
                created_at,
                updated_at
            FROM users
            ORDER BY created_at DESC
        ";

        $stmt = $db->prepare($sql);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $db = null;
        return $users ?: [];
    } catch (PDOException $e) {
        error_log("Database error in findAllUsers: " . $e->getMessage());
        throw new RuntimeException('Failed to retrieve users');
    }
}

function findUserById($id) {
    try {
        $db = connectDB();
        $sql = "
            SELECT 
                id,
                username,
                email,
                role,
                created_at,
                updated_at
            FROM users
            WHERE id = :id
            LIMIT 1
        ";

        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        $db = null;
        return $user ?: null;
    } catch (PDOException $e) {
        error_log("Database error in findUserById: " . $e->getMessage());
        throw new RuntimeException('Failed to retrieve user');
    }
}


function findUserByEmail($email) {
    try {
        $db = connectDB();
        $sql = "
            SELECT 
                id,
                username,
                email,
                password,
                role,
                created_at,
                updated_at
            FROM users
            WHERE email = :email
            LIMIT 1
        ";

        $stmt = $db->prepare($sql);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        $db = null;
        return $user ?: null;
    } catch (PDOException $e) {
        error_log("Database error in findUserByEmail: " . $e->getMessage());
        throw new RuntimeException('Failed to retrieve user by email');
    }
}
