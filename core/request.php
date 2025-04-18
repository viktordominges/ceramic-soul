<?php


function request($uri) {
    echo "Request function initialized.";
    echo "<br>";

    // Декодируем URI
    $uri = trim(urldecode($uri), '/');
    dump($uri);

    return $uri;
}