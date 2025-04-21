<?php

function categoryController() {
    $data = [
        'title' => 'Категория',
        'description' => 'Описание категории',
        'content' => renderContent('category')
    ];
    
    return renderView('layout', $data);
}