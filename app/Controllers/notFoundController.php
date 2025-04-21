<?php

/**
 * Контроллер для обработки страницы 404
 * 
 * @return string HTML-код страницы 404
 */
function notFoundController() {
    http_response_code(404);
    $data = [
        'title' => 'Страница не найдена',
        'content' => renderContent('404')
    ];
    return renderView('layout', $data);
}
