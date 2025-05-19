<?php

function methodNotAllowedController() {
    http_response_code(405);
    echo "Method Not Allowed";
    exit;
}
