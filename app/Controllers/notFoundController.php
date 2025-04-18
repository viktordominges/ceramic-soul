<?php

function notFoundController() {
    header('HTTP/1.0 404 Not Found');
    return '404 Страница не найдена';
}