<?php

if (PHP_MAJOR_VERSION < 8) {
    die('PHP 8.0 or higher is required.');
}

// Define constants for the project structure
require_once __DIR__ . '/../config/init.php';
require_once VENDOR . '/autoload.php';


application();
