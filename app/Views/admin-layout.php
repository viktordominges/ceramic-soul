<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?= htmlspecialchars($title ?? 'Admin Panel for Blog') ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/assets/css/admin.css">
    <meta name="description" content="<?= htmlspecialchars($description ?? 'Site description') ?>">
 
    <!-- Favicon -->
    <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon">

    <!-- Google fonts - Barlow -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />

    <!-- Font-awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

</head>
<body>
    <header class="admin-header">
        <div class="admin-container">
            <div class="admin-header__wrapper">
                <!-- <div class="main-dropdown__menu_trigger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div> -->
                <nav class="header__nav">
                    <a href="/admin/posts">Posts <span class="post-count"><?= htmlspecialchars($postCount ?? '0') ?></span></a>
                    <a href="/admin/categories">Categories <span class="category-count"><?= htmlspecialchars($categoryCount ?? '0') ?></span></a>
                    <a href="/admin/users">Users <span class="user-count"><?= htmlspecialchars($userCount ?? '0') ?></span></a>
                </nav>

                <!-- <div class="main-dropdown__menu">
                    <div class="main-dropdown__menu_items">
                        <span class="dropdown__close"></span>
                        <a href="/">Home</a>
                        <a href="/about">About</a>
                        <a href="/categories">Categories</a>
                    </div>
                </div> -->

                <!-- Триггер для открытия выпадающего меню аккаунта -->
                <div class="admin-account__trigger"> 
                    <?php if (isset($_SESSION['admin'])): ?>
                        <img src="<?= 
                            !empty($_SESSION['admin']['avatar']) 
                            ? htmlspecialchars($_SESSION['admin']['avatar']) 
                            : '/assets/images/placeholders/default-avatar.png' 
                        ?>" alt="avatar">
                    <?php else: ?>
                        <img src="/assets/images/placeholders/default-avatar.png" alt="avatar">
                    <?php endif; ?>
                </div>
            </div>
        </div>
        
    </header>
 

    <main>
        <div class="admin-container">
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
        </div>
    </main>

    <footer class="admin-footer">
        <div class="admin-container">
            <p>&copy; <?= date('Y') ?> Blog Admin Panel. All rights reserved.</p>
        </div>
    </footer>

    <div class="admin-account__dropdown-menu">

        <span class="admin-close__trigger"></span>

        <!-- <a href="/register">Register</a> -->
        <div class="admin-logout__trigger">Logout</div>
        <a href="/">Site</a>
    </div>        

    <div class="dropdown-overlay"></div>

    <script type="module" src="/assets/js/main.js"></script>
</body>
</html>