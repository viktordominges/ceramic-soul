<?php

function apiAdminLoginController() {
    try {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            return methodNotAllowedController();
        }

        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';

        if (empty($email) || empty($password)) {
            return json_response(['error' => 'Email and password are required.'], 400);
        }

        $user = authenticateUser($email, $password);

        if (!isset($user['role']) || $user['role'] !== 'admin') {
            return json_response(['error' => 'Access denied.'], 403);
        }

        $_SESSION['admin'] = [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'role' => $user['role'],
            'avatar' => $user['avatar'] ?? '',
        ];

        return json_response([
            'message' => 'Admin login successful!',
            'admin' => $_SESSION['admin']
        ]);

    } catch (InvalidArgumentException $e) {
        return json_response(['error' => $e->getMessage()], 401);

    } catch (RuntimeException $e) {
        return json_response(['error' => $e->getMessage()], 500);

    } catch (Exception $e) {
        return json_response(['error' => 'Unexpected server error.'], 500);
    }
}
