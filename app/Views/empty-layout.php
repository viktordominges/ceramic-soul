<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/assets/css/style.css">
    <title>Page Not Found | 404 Error</title>
</head>
<body>
    <main>
        <?php 
        // Здесь будет подгружаться динамический контент
        if (!empty($content)) {
            if (is_string($content)) {
                echo $content;
            } else {
                echo 'Invalid content format';
            }
        } else {
            echo 'Content not loaded';
        }
        ?>
    </main>
</body>
</html>