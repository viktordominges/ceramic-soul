<?php

function categoryController() {
    // Здесь вы можете добавить логику для обработки категорий
    // Например, получение списка категорий из базы данных
    // $categories = getCategoriesFromDatabase();
    // return $categories;
    // Для примера вернем статический массив категорий
    $categories = [
        ['id' => 1, 'name' => 'Electronics'],
        ['id' => 2, 'name' => 'Books'],
        ['id' => 3, 'name' => 'Clothing'],
    ];
    return $categories;
}