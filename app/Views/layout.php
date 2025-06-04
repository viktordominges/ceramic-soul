<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?= htmlspecialchars($title ?? 'Blog') ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/assets/css/style.css">
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
    <header class="header">
        <div class="main-container">
            <div class="header__wrapper">
                <div class="main-dropdown__menu_trigger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div class="header__logo">
                    <a href="/">
                        <img src="/assets/images/img/logo.png" alt="logo">
                    </a>
                </div>

                <nav class="header__nav">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/categories">Categories</a>
                </nav>
                
                <div class="header-auth__triggers">
                    <?php if (isset($_SESSION['user'])): ?>
                        <img class="user-open__trigger" src="<?= $_SESSION['user']['avatar'] ?>" alt="avatar">
                    <?php else: ?>
                        <span class="auth-open__trigger">Login</span>
                    <?php endif; ?>
                </div>


            </div>
            <div class="header__social-icons">
                <a href="https://www.facebook.com/"><span class="icon-facebook">
                    <img src="/assets/images/icons/fb.svg" alt="Facebook">
                </span></a>
                <a href="https://www.instagram.com/"><span class="icon-instagram">
                    <img src="/assets/images/icons/instagram.svg" alt="Instagram">
                </span></a>
                <a href="https://www.pinterest.com/"><span class="icon-pinterest-circled">
                    <img src="/assets/images/icons/pinterest.svg" alt="Pinterest">
                </span></a>
            </div>
        </div>

        <div class="main-dropdown__menu">
            <div class="main-dropdown__menu_items">
                <span class="dropdown__close"></span>
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/categories">Categories</a>
            </div>
        </div>

        <div class="dropdown-auth__menu">
            <span class="auth-close__trigger"></span>
            <a href="/login">Login</a>
            <a href="/register">Create account</a>
        </div>

        <div class="dropdown-account__menu">
            <span class="user-close__trigger"></span>
            <div class="user-logout__trigger">Logout</div> 
            <div class="user-delete__trigger">Delete account</div>
            <div class="user-edit__trigger"><a href="/update">Edit profile</a></div>
        </div>
    </header>
 

    <main>
        <div class="main-container">
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
    
    <footer class="footer">
        <div class="main-container">
            <div class="footer__wrapper">
                <div class="footer__newsletter">
                    <h2 class="footer__header">newsletter</h2>
                    <div class="footer__text footer__text_spaced">
                        Keep up to date with news and promotions
                    </div>
                    <form action="#" class="footer__form">
                        <input
                            placeholder="Enter your e-mail"
                            type="email"
                            class="footer__input"
                            id="footer__email"
                            name="footer__email"
                            required
                        />
                        <div class="email-error-message"></div>
                        <label class="footer__check-block" for="footer__checkbox">
                            <input
                                required
                                class="footer__checkbox"
                                type="checkbox"
                                id="footer__checkbox"
                            />
                            <span class="custom-checkbox"></span>
                            I agree with the <a href="#">terms</a></label
                        >
                        <div class="check-error-message"></div>
                        <button class="btn-submit footer__form-btn">submit</button>
                    </form>
                </div>
                <div class="footer__links_discover">
                    <h2 class="footer__header">discover</h2>
                    <nav class="footer__nav">
                        <ul>
                            <li class="footer__link"><a href="#">Home</a></li>
                            <li class="footer__link"><a href="#">Categories</a></li>
                            <li class="footer__link"><a href="#">About</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="footer__links_information">
                    <h2 class="footer__header">information</h2>
                    <nav class="footer__nav">
                        <ul>
                            <li class="footer__link">
                                <a href="#">Terms and Conditions</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="footer__social">
                    <h2 class="footer__header">follow us</h2>
                    <ul class="footer__social-block">
                        <li>
                            <a href="https://www.facebook.com/" class="social-link" aria-label="Facebook">
                            <svg class="social-icon" viewBox="0 0 24 24">
                                <path d="M22 12C22 6.48 17.52 2 12 2S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99h-2.54V12h2.54V9.79c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 17 22 12z" />
                            </svg>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/" class="social-link" aria-label="Instagram">
                            <svg class="social-icon" viewBox="0 0 24 24">
                                <path d="M7.75 2C5.13 2 3 4.13 3 6.75v10.5C3 19.87 5.13 22 7.75 22h8.5C18.87 22 21 19.87 21 17.25V6.75C21 4.13 18.87 2 16.25 2h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.5-.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
                            </svg>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.pinterest.com/" class="social-link" aria-label="Pinterest">
                            <svg class="social-icon" viewBox="0 0 24 24">
                                <path d="M12.04 2C6.48 2 2 6.15 2 11.54c0 3.89 2.48 6.07 4.21 6.07.66 0 1.05-1.81 1.05-2.31 0-.61-1.56-1.92-1.56-4.5 0-3.57 2.71-6.26 6.6-6.26 3.2 0 5.59 2.12 5.59 5.15 0 3.1-1.56 5.47-3.6 5.47-1.12 0-2.17-.92-1.87-2.05.32-1.32.94-2.73.94-3.68 0-.85-.45-1.56-1.39-1.56-1.1 0-1.98 1.15-1.98 2.7 0 1 .33 1.67.33 1.67s-1.13 4.76-1.34 5.59c-.4 1.58-.06 4.01-.03 4.23.02.15.21.19.29.08.12-.15 1.6-2.19 2.1-4.2.14-.54.82-3.18.82-3.18.41.77 1.61 1.45 2.88 1.45 3.8 0 6.61-3.46 6.61-8.12C21.5 6.33 17.3 2 12.04 2z" />
                            </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer__copyright">© Copyright <?= date('Y') ?>, Ceramic Blog</div>
        </div>
    </footer>
    <div class="dropdown-overlay"></div>
    <script type="module" src="/assets/js/main.js"></script>
</body>
</html>