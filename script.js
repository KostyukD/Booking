window.onload = function () {

    // --- 1. ЗНАХОДИМО ВСІ ЕЛЕМЕНТИ ---
    
    // Модальні вікна
    const signInOverlay = document.getElementById('modalOverlay');
    const registerOverlay = document.getElementById('registerOverlay');
    const authOverlay = document.getElementById('authOverlay');
    const infoOverlay = document.getElementById('infoOverlay');
    const doneOverlay = document.getElementById('doneOverlay');

    // Елементи ХЕДЕРА (для заміни кнопок на фото)
    const authButtonsContainer = document.getElementById('authButtonsContainer');
    const userProfileHeader = document.getElementById('userProfileHeader');

    // Кнопки відкриття вікон
    const openSignInBtn = document.getElementById('openSignIn');
    const openRegisterBtn = document.getElementById('openRegisterHeader');
    const openRegisterFooterBtn = document.querySelector('.register-purple-btn'); 

    // Кнопки закриття (хрестики)
    const closeSignInBtn = document.getElementById('closeModal');
    const closeRegisterBtn = document.getElementById('closeRegister');
    const closeAuthBtn = document.getElementById('closeAuth');
    const closeInfoBtn = document.getElementById('closeInfo');
    const closeDoneBtn = document.getElementById('closeDone');

    // Посилання всередині модалок
    const linkToRegister = document.getElementById('linkToRegister');
    const linkToSignIn = document.getElementById('linkToSignIn');

    // Кнопки "Continue"
    const loginContinueBtn = document.getElementById('loginContinueBtn'); // Кнопка у вікні Sign In
    const authContinueBtn = document.getElementById('authContinueBtn');
    const regContinueBtn = document.getElementById('regContinueBtn');
    const infoContinueBtn = document.getElementById('infoContinueBtn');
    const infoLaterBtn = document.getElementById('infoLaterBtn');
    const checkProfileBtn = document.getElementById('checkProfileBtn'); 
    const continueBookingBtn = document.getElementById('continueBookingBtn');
    const bronBtn = document.getElementById('bronBtn'); 

    // --- 2. ФУНКЦІЇ ВІДКРИТТЯ/ЗАКРИТТЯ ---

    function show(modal) {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function hide(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // --- 3. ЛОГІКА ВІДКРИТТЯ ---
    if (openSignInBtn) openSignInBtn.onclick = () => show(signInOverlay);
    if (openRegisterBtn) openRegisterBtn.onclick = () => show(registerOverlay);
    if (openRegisterFooterBtn) openRegisterFooterBtn.onclick = () => show(registerOverlay);

    // --- 4. ЛОГІКА ЗАКРИТТЯ ---
    if (closeSignInBtn) closeSignInBtn.onclick = () => hide(signInOverlay);
    if (closeRegisterBtn) closeRegisterBtn.onclick = () => hide(registerOverlay);
    if (closeAuthBtn) closeAuthBtn.onclick = () => hide(authOverlay);
    if (closeInfoBtn) closeInfoBtn.onclick = () => hide(infoOverlay);
    if (closeDoneBtn) closeDoneBtn.onclick = () => hide(doneOverlay);

    // Закриття по кліку на фон
    window.onclick = function (event) {
        if (event.target === signInOverlay) hide(signInOverlay);
        if (event.target === registerOverlay) hide(registerOverlay);
        if (event.target === authOverlay) hide(authOverlay);
        if (event.target === infoOverlay) hide(infoOverlay);
        if (event.target === doneOverlay) hide(doneOverlay);
    };

    // Переходи між Sign In та Register
    if (linkToRegister) {
        linkToRegister.onclick = (e) => { e.preventDefault(); hide(signInOverlay); show(registerOverlay); };
    }
    if (linkToSignIn) {
        linkToSignIn.onclick = (e) => { e.preventDefault(); hide(registerOverlay); show(signInOverlay); };
    }

    // --- 5. АКТИВАЦІЯ КНОПОК (ФІОЛЕТОВИЙ КОЛІР) ---
    function handleInputs(inputClass, btnId) {
        const inputs = document.querySelectorAll(inputClass);
        const btn = document.getElementById(btnId);
        if (!btn || inputs.length === 0) return;

        const checkInputs = () => {
            let allFilled = true;
            inputs.forEach(i => { 
                if (i.value.trim() === "") allFilled = false; 
            });
            
            if (allFilled) btn.classList.add('active');
            else btn.classList.remove('active');
        };

        inputs.forEach(input => {
            input.addEventListener('input', checkInputs);
            input.addEventListener('change', checkInputs); 
        });
    }

    handleInputs('.login-input', 'loginContinueBtn');
    handleInputs('.reg-input', 'regContinueBtn');
    handleInputs('.auth-input', 'authContinueBtn');
    handleInputs('.info-input', 'infoContinueBtn');


    // --- 6. ЛОГІКА КНОПОК "CONTINUE" ---

    // === ВХІД (SIGN IN) - ОНОВЛЕНО ===
    if (loginContinueBtn) {
        loginContinueBtn.onclick = () => {
            // Якщо кнопка активна (щось введено), робимо вхід
            if (loginContinueBtn.classList.contains('active')) {
                hide(signInOverlay); // Закриваємо вікно
                
                // Міняємо кнопки на фото
                if (authButtonsContainer) authButtonsContainer.style.display = 'none';
                if (userProfileHeader) userProfileHeader.style.display = 'block';
            }
        };
    }

    // === РЕЄСТРАЦІЯ (ЛАНЦЮЖОК) ===
    
    // 1. Register -> Auth
    if (regContinueBtn) {
        regContinueBtn.onclick = () => { 
            if (regContinueBtn.classList.contains('active')) { 
                hide(registerOverlay); 
                show(authOverlay); 
            } 
        };
    }

    // 2. Auth -> Info
    if (authContinueBtn) {
        authContinueBtn.onclick = () => {
            if (authContinueBtn.classList.contains('active')) { 
                hide(authOverlay); 
                show(infoOverlay); 
            }
        };
    }
    
    // 3. Info -> All Done (і теж міняємо хедер)
    if (infoContinueBtn) {
        infoContinueBtn.onclick = () => { 
            if (infoContinueBtn.classList.contains('active')) { 
                hide(infoOverlay); 
                show(doneOverlay); 
                
                // Міняємо кнопки на фото
                if (authButtonsContainer) authButtonsContainer.style.display = 'none';
                if (userProfileHeader) userProfileHeader.style.display = 'block';
            } 
        };
    }
    
    // Кнопка "Later"
    if (infoLaterBtn) {
        infoLaterBtn.onclick = () => { 
            hide(infoOverlay); 
            // Також вважаємо, що вхід виконано
            if (authButtonsContainer) authButtonsContainer.style.display = 'none';
            if (userProfileHeader) userProfileHeader.style.display = 'block';
        };
    }

    // === ФІНАЛ (ALL DONE) ===
    
    // Перехід на account.html
    if (checkProfileBtn) {
        checkProfileBtn.onclick = () => {
            window.location.href = 'account.html';
        };
    }

    // Просто закрити
    if (continueBookingBtn) {
        continueBookingBtn.onclick = () => {
            hide(doneOverlay);
            // Переконуємось, що хедер оновлений
            if (authButtonsContainer) authButtonsContainer.style.display = 'none';
            if (userProfileHeader) userProfileHeader.style.display = 'block';
        };
    }
};



/*їбуче пронювання*/
if (bronBtn) {
    bronBtn.onclick = () => {
        window.location.href = 'index_bron.html';
    };
}
