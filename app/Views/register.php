<section class="register">
    <!-- Здесь будет рендериться форма для регистрации -->
    <div class="main-form__wrapper">
        <h2>CREATE ACCOUNT</h2>
        <form class="main-form" id="register-form" enctype="multipart/form-data" novalidate>
            <label for="username">Enter your name:</label>
            <input type="text" id="username" name="username" placeholder="Name" required />

            <label for="email">Enter your email:</label>
            <input type="email" id="email" name="email" placeholder="Email" required />

            <label for="password">Enter your password:</label>
            <input type="password" id="password" name="password" placeholder="Password" required />

            <label for="confirm_password">Repeat your password:</label>
            <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm Password" required />

            <label for="avatar" class="note">Add your avatar image (jpeg, png, jpg, 1 mb max.)</label>
            <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg, image/jpg" />

            <div class="terms">
                <label>
                    <input type="checkbox" id="terms" name="terms" required />
                    I agree with the <a href="#">terms</a>
                </label>
            </div>

            <button type="submit">CREATE ACCOUNT</button>

            <div class="back-to">You already have an account?<a href="/login"> Back to login</a></div>
        </form>
    </div>
</section>