
<section class="login">
    <!-- Здесь будет рендериться форма для регистрации -->
    <div class="main-form__wrapper">
        <h2>Login to your account</h2>
        <form class="main-form" id="login-form" action="/login" method="POST" novalidate>
        
            <label for="email">Enter your email:</label>
            <input type="email" id="email" name="email" placeholder="Email" required />

            <label for="password">Enter your password:</label>
            <input type="password" id="password" name="password" placeholder="Password" required />

            <button type="submit">Login</button>

            <div class="back-to">Don't have an account?<a href="/register"> Go to Register</a></div>
        </form>
    </div>
</section>