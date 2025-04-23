<?php

function categoriesController() {
    $data = [
        'title' => 'Категории',
        'description' => 'Список всех категорий',
        'content' => renderContent('categories') // app/Views/categories.php
    ];
    
    return renderView('layout', $data);
}
