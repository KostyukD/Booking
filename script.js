document.addEventListener('DOMContentLoaded', () => {
    
    // Елементи
    const modalOverlay = document.getElementById('modalOverlay');
    const registerOverlay = document.getElementById('registerOverlay');
    const authOverlay = document.getElementById('authOverlay');
    const infoOverlay = document.getElementById('infoOverlay');
    const doneOverlay = document.getElementById('doneOverlay');

    const openSignInBtn = document.getElementById('openSignIn');
    const openRegisterHeader = document.getElementById('openRegisterHeader');
    const linkToRegister = document.getElementById('linkToRegister');
    const linkToSignIn = document.getElementById('linkToSignIn');

    // Кнопки для перемикання станів (логін)
    const loginContinueBtn = document.getElementById('loginContinueBtn');
    const regContinueBtn = document.getElementById('regContinueBtn');
    const authButtonsContainer = document.getElementById('authButtonsContainer');
    const userProfileHeader = document.getElementById('userProfileHeader');

    // Функція відкриття модалки
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Функція закриття всіх модалок
    function closeAllModals() {
        document.querySelectorAll('.overlay').forEach(overlay => {
            overlay.classList.remove('active');
        });
        document.body.style.overflow = '';
    }

    // --- ЛОГІКА ВІДКРИТТЯ ВІКОН ---

    // Відкрити Sign In
    if(openSignInBtn) {
        openSignInBtn.addEventListener('click', () => openModal(modalOverlay));
    }

    // Відкрити Register
    if(openRegisterHeader) {
        openRegisterHeader.addEventListener('click', () => openModal(registerOverlay));
    }

    // Перехід з Sign In на Register
    if(linkToRegister) {
        linkToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            openModal(registerOverlay);
        });
    }

    // Перехід з Register на Sign In
    if(linkToSignIn) {
        linkToSignIn.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            openModal(modalOverlay);
        });
    }

    // Закриття на хрестик
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    // Закриття при кліку на фон
    document.querySelectorAll('.overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeAllModals();
            }
        });
    });

    // --- ЛОГІКА "ВХОДУ" (ГОЛОВНА ЧАСТИНА) ---
    
    function performLogin() {
        // 1. Закриваємо поточне вікно
        closeAllModals();

        // 2. Ховаємо кнопки входу
        if(authButtonsContainer) authButtonsContainer.style.display = 'none';

        // 3. Показуємо фото профілю
        if(userProfileHeader) userProfileHeader.style.display = 'block';

        // 4. Відкриваємо вікно "All done!"
        openModal(doneOverlay);
    }

    // При натисканні Continue в Sign In
    if(loginContinueBtn) {
        loginContinueBtn.addEventListener('click', performLogin);
    }

    // При натисканні Continue в Register
    if(regContinueBtn) {
        regContinueBtn.addEventListener('click', performLogin);
    }
    
    // Кнопка "Check your profile" у фінальному вікні
    const checkProfileBtn = document.getElementById('checkProfileBtn');
    if(checkProfileBtn) {
        checkProfileBtn.addEventListener('click', () => {
             window.location.href = 'account.html';
        });
    }
    
    // Кнопка "Continue booking"
    const continueBookingBtn = document.getElementById('continueBookingBtn');
    if(continueBookingBtn) {
        continueBookingBtn.addEventListener('click', closeAllModals);
    }

});
