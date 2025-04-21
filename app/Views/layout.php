<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title><?= htmlspecialchars($title ?? 'Мой сайт') ?></title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 0;
            padding: 0;
        }
        header {
            background: #2c3e50;
            color: white;
            padding: 1rem;
        }
        main {
            padding: 2rem;
            min-height: 60vh;
        }
        footer {
            background: #34495e;
            color: white;
            padding: 1rem;
            text-align: center;
        }
    </style>
</head>
<body>
    <header>
        <h1>Мой сайт</h1>
        <nav>
            <a href="/">Главная</a> |
            <a href="/about">О нас</a> |
            <a href="/contact">Контакты</a>
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