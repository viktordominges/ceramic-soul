<?php

function categoriesController() {
    $data = [
        'title' => 'Categories',
        'description' => 'List of all categories',
        'content' => renderContent('categories') // app/Views/categories.php
    ];
    
    return renderView('layout', $data);
}
