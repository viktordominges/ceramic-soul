<section class="update-user">
    <!-- Здесь будет рендериться форма для регистрации -->
    <div class="main-form__wrapper">
        <h2>UPDATE ACCOUNT</h2>
        <form class="main-form" id="update-form" enctype="multipart/form-data" novalidate>
            <div>
                <label for="username">Update your name:</label>
                <input type="text" id="username" name="username" placeholder="Name" required />
            </div>
            
            <div>
                <label for="password">Update your password:</label>
                <input type="password" id="password" name="password" placeholder="Password" required />
            </div>

            <div>
                <label for="confirm_password">Repeat your new password:</label>
                <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm Password" required />
            </div>

            <div>
                <label for="avatar" class="note">Add your new avatar image (jpeg, png, jpg, 1 mb max.)</label>
                <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg, image/jpg" />
            </div>

            <button type="submit">UPDATE ACCOUNT</button>

            <div class="back-to"><a href="/">Back to main page</a></div>
        </form>
    </div>
    <!-- <script src="/assets/js/modules/validation.js"></script> -->
</section>