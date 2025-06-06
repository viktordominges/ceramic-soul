<?php


/**
 * Returns a decoded URI.
 *
 * @param string $uri
 * @return string
 */
function request($uri) {

    // Декодируем URI
    $uri = trim(urldecode($uri), '/');

    return $uri;
}


function getMethod() {
    return $_SERVER['REQUEST_METHOD'];
}

function getBody() {
    return file_get_contents('php://input');
}

function getFiles() {
    return $_FILES;
}

function getCookies() {
    return $_COOKIE;
}

function getSession() {
    return $_SESSION;
}