<?php
function application() {
    // 1. Включаем буферизацию
    ob_start();
    
    // 2. Логирование инициализации
    echo "Application function initialized.<br>";
    
    // 3. Получаем и анализируем URI
    $uri = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
    dump($uri);

    // 4. Обрабатываем запрос
    $request = request($uri);
    
    // 5. Получаем контент от роутера
    $content = router($uri);
    
    // 6. Формируем полный ответ
    $response = response();
    $response['content'] = $content;
    dump($response);
    
    // 7. Очищаем буфер и отправляем ответ
    ob_end_clean();
    send_response($response);
}