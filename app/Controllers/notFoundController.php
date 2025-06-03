<?php

/**
 * Контроллер для обработки страницы 404
 * 
 * @return string HTML-код страницы 404
 */
function notFoundController() {
    http_response_code(404);
    $data = [
        'title' => 'Page not found',
        'description' => 'The page you are looking for does not exist.',
        'content' => renderContent('404')
    ];
    return renderView('empty-layout', $data);
}
