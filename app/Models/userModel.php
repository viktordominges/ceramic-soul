<?php

function createUser($username, $email, $password, $role = 'user', $avatar = null) {

    // Валидация входных данных
    $validationErrors = validateUserData($username, $email, $password, true); //Флаг true означает что пароль обязателен
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


function authenticateUser($email, $password) {
    try {
        $db = connectDB();

        // Получаем пользователя по email
        $sql = "SELECT * FROM users WHERE email = :email LIMIT 1";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Если пользователь не найден
        if (!$user) {
            throw new InvalidArgumentException("User with this email not found.");
        }

        // Проверка пароля
        if (!password_verify($password, $user['password'])) {
            throw new InvalidArgumentException("Incorrect password.");
        }

        // Всё прошло успешно — можно вернуть данные пользователя
        unset($user['password']); // Удаляем хеш пароля из результата
        return $user;

    } catch (PDOException $e) {
        error_log("Database error in authenticateUser: " . $e->getMessage());
        throw new RuntimeException('Authentication failed due to server error.');
    }
}


function updateUser($userId, $username, $password = null, $avatar = null) {
    $db = connectDB();

    // Получаем текущие данные пользователя
    $stmt = $db->prepare("SELECT * FROM users WHERE id = :id");
    $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
    $stmt->execute();
    $existingUser = $stmt->fetch();

    if (!$existingUser) {
        throw new InvalidArgumentException("User not found.");
    }

    // Валидация данных
    if (!empty($username)) {
        $errors = validateUserData($username, $existingUser['email'], $password, false); // Флаг false означает что пароль необязателен
        if (!empty($errors)) {
            throw new InvalidArgumentException(implode(" ", $errors));
        }
    }

    // Обработка аватара
    $avatarPath = $existingUser['avatar'];
    if ($avatar !== null && $avatar['error'] === UPLOAD_ERR_OK) {
        $avatarPath = validateUserAvatar($avatar);
    }

    try {
        $sql = "UPDATE users SET username = :username";

        if (!empty($password)) {
            $sql .= ", password = :password";
        }

        if ($avatar !== null && $avatar['error'] === UPLOAD_ERR_OK) {
            $sql .= ", avatar = :avatar";
        }

        $sql .= " WHERE id = :id";

        $stmt = $db->prepare($sql);

        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        if (!empty($password)) {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $stmt->bindParam(':password', $hashedPassword, PDO::PARAM_STR);
        }
        if ($avatar !== null && $avatar['error'] === UPLOAD_ERR_OK) {
            $stmt->bindParam(':avatar', $avatarPath, PDO::PARAM_STR);
        }
        $stmt->bindParam(':id', $userId, PDO::PARAM_INT);

        $stmt->execute();

        // Обновление сессии, если это текущий пользователь
        if (isset($_SESSION['user']) && $_SESSION['user']['id'] == $userId) {
            $_SESSION['user']['username'] = $username;
            if ($avatar !== null && $avatar['error'] === UPLOAD_ERR_OK) {
                $_SESSION['user']['avatar'] = $avatarPath;
            }
        }

        return true;

    } catch (PDOException $e) {
        error_log("Error in updateUserByAdmin: " . $e->getMessage());
        throw new RuntimeException("Failed to update user.");
    }
}




function deleteUser($id) {
    try {
        $db = connectDB();

        // Получаем пользователя по ID
        $sql = "SELECT * FROM users WHERE id = :id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$user) {
            throw new InvalidArgumentException("User not found.");
        }

        $avatarPath = $user['avatar'];
        if ($avatarPath) {
            $fullPath = WWW . $avatarPath;
            if (file_exists($fullPath)) {
                unlink($fullPath);
            }
        }

        // Удаляем пользователя из базы данных
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
                avatar,
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

function getUsersCount() {
    try {
        $db = connectDB();
        $sql = "SELECT COUNT(*) as total FROM users";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $db = null;

        return (int) ($result['total'] ?? 0);
    } catch (PDOException $e) {
        error_log("Database error in getUsersCount: " . $e->getMessage());
        throw new RuntimeException('Failed to get user count');
    }
}
