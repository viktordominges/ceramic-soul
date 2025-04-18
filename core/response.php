<?php


function response() {
    echo "Response function initialized.";
    echo "<br>";
    
    return [
        'status' => 200,
        'headers' => [],
        'content' => ''
    ];
}

function send_response($response) {
    // Устанавливаем статус первым
    http_response_code($response['status']);
    
    // Добавляем заголовки
    foreach ($response['headers'] as $name => $value) {
        header("$name: $value");
    }
    
    // Выводим содержимое
    echo $response['content'];
}

/**
 * JSON-ответ
 */
function json_response($data, int $status = 200) {
    $response = response();
    $response['status'] = $status;
    $response['headers']['Content-Type'] = 'application/json';
    $response['content'] = json_encode($data, JSON_UNESCAPED_UNICODE);
    return $response;
}

/**
 * Редирект
 */
function redirect(string $url, int $status = 302) {
    $response = response();
    $response['status'] = $status;
    $response['headers']['Location'] = $url;
    return $response;
}