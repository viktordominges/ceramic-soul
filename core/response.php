<?php
function response() {
    return [
        'status' => 200,
        'headers' => [],
        'content' => ''
    ];
}

function json_response($data, int $status = 200) {
    if (!is_array($data) && !is_object($data)) {
        $data = ['message' => $data];
    }

    // Очищаем буфер (на случай, если что-то уже было выведено)
    if (ob_get_length()) {
        ob_clean();
    }

    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit; // Важно завершить выполнение
}

function send_response($response) {
    http_response_code($response['status'] ?? 200);

    foreach ($response['headers'] ?? [] as $name => $value) {
        header("$name: $value");
    }

    echo $response['content'];
}

function redirect(string $url, int $status = 302) {
    if (!filter_var($url, FILTER_VALIDATE_URL)) {
        throw new InvalidArgumentException('Invalid URL provided for redirect');
    }

    $response = response();
    $response['status'] = $status;
    $response['headers']['Location'] = $url;
    
    // Для редиректа обычно не нужно тело ответа
    return $response;
}
