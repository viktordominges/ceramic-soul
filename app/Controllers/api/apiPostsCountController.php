<?php

function apiPostsCountController() {
    try {
        $count = getPostsCount();

        error_log('Total posts count: ' . $count);

        return json_response(['total' => $count], 200);
        
    } catch (Exception $e) {
        error_log('Posts count error: ' . $e->getMessage());
        return json_response(['error' => 'Internal Server Error'], 500);
    }
}
