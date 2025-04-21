<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?= htmlspecialchars($title ?? 'Мой сайт') ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/assets/css/style.css">
    <meta name="description" content="<?= htmlspecialchars($description ?? 'Описание сайта') ?>">
    <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon">
    <script src="/assets/js/script.js" defer></script>
</head>
<body>
<header>
    <h1>Мой сайт</h1>
    <nav>
        <a href="/">Главная</a> |
        <a href="/about">О нас</a> |
        <a href="/contact">Контакты</a> |
        
        <div class="dropdown">
            <a href="#" class="dropdown-toggle">Категории ▼</a>
            <div class="dropdown-menu">
                <!-- <a href="/category?slug=technology">Технологии</a>
                <a href="/category?slug=travel">Путешествия</a>
                <a href="/category?slug=food">Еда</a>
                <a href="/category?slug=sport">Спорт</a>
                <a href="/category?slug=art">Искусство</a> -->
            </div>
        </div>
    </nav>
</header>


    <main>
        <?php 
        // Здесь будет подгружаться динамический контент
        if (!empty($content)) {
            if (is_string($content)) {
                echo $content;
            } else {
                echo 'Неверный формат контента';
            }
        } else {
            echo 'Контент не загружен';
        }
        ?>
    </main>

    <footer>
        &copy; <?= date('Y') ?> Все права защищены
    </footer>
</body>
</html>