<?php
 
function apiGetPostByIdController($id)
{
    try {
        if (!is_numeric($id) || $id < 1) {
            return json_response(['error' => 'Invalid post ID'], 400);
        }

        $post = getPostById($id);

        if (!$post) {
            return json_response(['error' => 'Post not found'], 404);
        }

        return json_response($post);
        
    } catch (Exception $e) {
        return json_response(['error' => 'Server error'], 500);
    }
}
  