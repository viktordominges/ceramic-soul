<?php

/**
 * Connects to the database
 * 
 * @return \PDO
 * 
 * @throws \PDOException
 */
function connectDB() {
    
    static $config = null;

    if ($config === null) {
        $config = require CONFIG . '/database.php'; 
        if (empty($config)) {
            die("Database configuration is not set.");
        }
    }
    
    try {
        $dsn = "mysql:host={$config['host']};port={$config['port']};dbname={$config['dbname']};charset={$config['charset']}";
        $pdo = new PDO($dsn, $config['username'], $config['password']);
        
        // Базовые настройки
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Вывод ошибок
        $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false); // Эмуляция подготовленных запросов
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC); // Режим выборки по умолчанию
        
        return $pdo;
    } catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
}