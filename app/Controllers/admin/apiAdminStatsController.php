<?php
function apiAdminStatsController() {
    try {
        $postCount = getPostsCount();
        $categoryCount = getCategoriesCount();
        $userCount = getUsersCount();

        $data = [
            'postCount' => (int)$postCount,
            'categoryCount' => (int)$categoryCount,
            'userCount' => (int)$userCount,
        ];

        return json_response($data, 200);

    } catch (Exception $e) {

        return json_response(['error' => 'Internal Server Error'], 500);
    }
}




// function apiAdminStatsController() {
//     file_put_contents('log.txt', "1. Контроллер вызван\n", FILE_APPEND);

//     try {
//         $postCount = getPostsCount();
//         file_put_contents('log.txt', "2. postCount: $postCount\n", FILE_APPEND);

//         $categoryCount = getCategoriesCount();
//         file_put_contents('log.txt', "3. categoryCount: $categoryCount\n", FILE_APPEND);

//         $userCount = getUsersCount();
//         file_put_contents('log.txt', "4. userCount: $userCount\n", FILE_APPEND);

//         $data = [
//             'postCount' => $postCount,
//             'categoryCount' => $categoryCount,
//             'userCount' => $userCount,
//         ];

//         header('Content-Type: application/json');
//         http_response_code(200);

//         $json = json_encode($data, JSON_UNESCAPED_UNICODE);
//         file_put_contents('log.txt', "5. JSON: $json\n", FILE_APPEND);

//         echo $json;

//     } catch (Exception $e) {
//         file_put_contents('log.txt', 'ERROR: ' . $e->getMessage() . "\n", FILE_APPEND);
//         http_response_code(500);
//         echo json_encode(['error' => 'Internal Server Error']);
//     }
// }
