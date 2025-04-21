<?php


function response() {
    // Начинаем с пустого ответа
    return [
        'status' => 200,
        'headers' => [],
        'content' => ''
    ];
}

/**
 * Отправка ответа клиенту
 * 
 * @param array $response Массив с данными ответа
 * @return void
 */
function send_response($response) {
    http_response_code($response['status'] ?? 200);

    foreach ($response['headers'] ?? [] as $name => $value) {
        header("$name: $value");
    }

    // Проверяем, является ли content строкой перед выводом
    echo is_string($response['content']) ? $response['content'] : json_encode($response['content']);
}

/**
 * JSON-ответ
 */
function json_response($data, int $status = 200) {
    $response = response();
    $response['status'] = $status;
    $response['headers']['Content-Type'] = 'application/json';

    // Преобразуем данные в JSON
    $response['content'] = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    // Делаем распаковку массива из строки в контенте
    $response['content'] = json_decode($response['content'], true);  // Преобразуем обратно в массив

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
