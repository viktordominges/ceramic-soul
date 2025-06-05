<section class="register">
    <!-- Здесь будет рендериться форма для регистрации -->
    <div class="main-form__wrapper">
        <h2>CREATE SUPERADMIN ACCOUNT</h2>
        <form class="main-form" id="superadmin-register-form" enctype="multipart/form-data" novalidate>
            <div>
                <label for="username">Enter your name:</label>
                <input type="text" id="username" name="username" placeholder="Name" required />
            </div>
 
            <div>
                <label for="email">Enter your email:</label>
                <input type="email" id="email" name="email" placeholder="Email" required />
            </div>

            <div>
                <label for="password">Enter your password:</label>
                <input type="password" id="password" name="password" placeholder="Password" required />
            </div>

            <div>
                <label for="token">Input secret token:</label>
                <input type="password" id="token" name="token" placeholder="Secret token" required />
            </div>

            <div>
                <label for="avatar" class="note">Add your avatar image (jpeg, png, jpg, 1 mb max.)</label>
                <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg, image/jpg" />
            </div>

            <button type="submit">CREATE ACCOUNT</button>

            <div class="back-to">You already have an account?<a href="/admin"> Back to login</a></div>
        </form>
    </div>
    <!-- <script src="/assets/js/modules/validation.js"></script> -->
</section>