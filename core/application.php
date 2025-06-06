<?php

/**
 * Entry point of the application.
 *
 * 1. Enables output buffering.
 * 2. (todo) Processes the request.
 * 3. Gets and analyzes the URI.
 * 4. Processes the request.
 * 5. Gets content from the router.
 * 6. Forms the full response.
 * 7. Cleans the buffer and sends the response.
 */
function application() {
    // 1. Включаем буферизацию
    ob_start();
    
    // 3. Получаем и анализируем URI
    $uri = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');

    // 4. Обрабатываем запрос
    //$request = request($uri);
    
    // 5. Получаем контент от роутера
    $content = router($uri);
    
    // 6. Формируем полный ответ
    $response = response();
    $response['content'] = $content;
    
    // 7. Очищаем буфер и отправляем ответ
    ob_end_clean();
    send_response($response);
}