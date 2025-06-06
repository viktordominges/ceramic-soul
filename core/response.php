<?php

function response() {
    return [
        'status' => 200,
        'headers' => [],
        'content' => ''
    ];
}

/**
 * Sends JSON response with given data and status code.
 *
 * If the first parameter is not an array or object, it will be
 * wrapped in an array with key 'message'.
 *
 * @param mixed $data
 * @param int $status
 * @return void
 */
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



/**
 * Sends an HTTP response with the specified status code, headers, and content.
 *
 * The function sets the HTTP response code from the 'status' key in the $response array, 
 * and iterates over the 'headers' key to set each header. Finally, it outputs the 
 * 'content' key as the response body.
 *
 * @param array $response Associative array containing 'status', 'headers', and 'content'.
 *
 * @return void
 */

function send_response($response) {
    http_response_code($response['status'] ?? 200);

    foreach ($response['headers'] ?? [] as $name => $value) {
        header("$name: $value");
    }

    echo $response['content'];
}



/**
 * Prepares an HTTP redirect response.
 *
 * Validates the provided URL and sets up a response with the given status code
 * and location header for redirection. The default status code is 302, which indicates
 * a temporary redirect.
 *
 * @param string $url The URL to redirect to.
 * @param int $status The HTTP status code for the redirect (default is 302).
 *
 * @return array The response array containing the status and headers for the redirect.
 *
 * @throws InvalidArgumentException If the provided URL is not valid.
 */

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
