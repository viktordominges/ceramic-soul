<?php

function apiUsersController() {
    $data = ['users' => ['John', 'Jane']];
    return json_response($data);
}