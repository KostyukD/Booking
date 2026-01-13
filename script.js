window.onload = function () {

    // --- 1. ЕЛЕМЕНТИ ---
    const signInOverlay = document.getElementById('modalOverlay');
    const registerOverlay = document.getElementById('registerOverlay');
    const authOverlay = document.getElementById('authOverlay');
    const infoOverlay = document.getElementById('infoOverlay');
    const doneOverlay = document.getElementById('doneOverlay');

    const authButtonsContainer = document.getElementById('authButtonsContainer');
    const userProfileHeader = document.getElementById('userProfileHeader');

    // Кнопки
    const openSignInBtn = document.getElementById('openSignIn');
    const openRegisterBtn = document.getElementById('openRegisterHeader');
    const openRegisterFooterBtn = document.querySelector('.register-purple-btn'); 

    const closeSignInBtn = document.getElementById('closeModal');
    const closeRegisterBtn = document.getElementById('closeRegister');
    const closeAuthBtn = document.getElementById('closeAuth');
    const closeInfoBtn = document.getElementById('closeInfo');
    const closeDoneBtn = document.getElementById('closeDone');

    const linkToRegister = document.getElementById('linkToRegister');
    const linkToSignIn = document.getElementById('linkToSignIn');

    const loginContinueBtn = document.getElementById('loginContinueBtn');
    const authContinueBtn = document.getElementById('authContinueBtn');
    const regContinueBtn = document.getElementById('regContinueBtn');
    const infoContinueBtn = document.getElementById('infoContinueBtn');
    const infoLaterBtn = document.getElementById('infoLaterBtn');
    const checkProfileBtn = document.getElementById('checkProfileBtn'); 
    const continueBookingBtn = document.getElementById('continueBookingBtn');

    // --- 2. ФУНКЦІЇ ---
    function show(modal) {
        if (modal) modal.classList.add('active');
    }

    function hide(modal) {
        if (modal) modal.classList.remove('active');
    }

    // Функція для "Логіну" (змінює хедер)
    function userLoggedIn() {
        if (authButtonsContainer) authButtonsContainer.style.display = 'none';
        if (userProfileHeader) userProfileHeader.style.display = 'block';
    }

    // --- 3. ПОДІЇ ---
    
    // Відкриття
    if (openSignInBtn) openSignInBtn.onclick = () => show(signInOverlay);
    if (openRegisterBtn) openRegisterBtn.onclick = () => show(registerOverlay);
    if (openRegisterFooterBtn) openRegisterFooterBtn.onclick = () => show(registerOverlay);

    // Закриття
    if (closeSignInBtn) closeSignInBtn.onclick = () => hide(signInOverlay);
    if (closeRegisterBtn) closeRegisterBtn.onclick = () => hide(registerOverlay);
    if (closeAuthBtn) closeAuthBtn.onclick = () => hide(authOverlay);
    if (closeInfoBtn) closeInfoBtn.onclick = () => hide(infoOverlay);
    if (closeDoneBtn) closeDoneBtn.onclick = () => hide(doneOverlay);

    // Клік по фону
    window.onclick = function (event) {
        if (event.target === signInOverlay) hide(signInOverlay);
        if (event.target === registerOverlay) hide(registerOverlay);
        if (event.target === authOverlay) hide(authOverlay);
        if (event.target === infoOverlay) hide(infoOverlay);
        if (event.target === doneOverlay) hide(doneOverlay);
    };

    // Перемикання
    if (linkToRegister) linkToRegister.onclick = (e) => { e.preventDefault(); hide(signInOverlay); show(registerOverlay); };
    if (linkToSignIn) linkToSignIn.onclick = (e) => { e.preventDefault(); hide(registerOverlay); show(signInOverlay); };

    // --- ЛАНЦЮЖОК ВХОДУ ---

    // 1. Натискаємо Continue у Sign In -> Вхід виконано!
    if (loginContinueBtn) {
        loginContinueBtn.onclick = () => {
            if (loginContinueBtn.classList.contains('active')) {
                hide(signInOverlay);
                userLoggedIn(); // <--- ОСЬ ТУТ ЗНИКАЄ КНОПКА SIGN IN
            }
        };
    }

    // 2. Реєстрація: Register -> Auth
    if (regContinueBtn) {
        regContinueBtn.onclick = () => { 
            if (regContinueBtn.classList.contains('active')) { 
                hide(registerOverlay); show(authOverlay); 
            } 
        };
    }

    // 3. Auth -> Info
    if (authContinueBtn) {
        authContinueBtn.onclick = () => {
            if (authContinueBtn.classList.contains('active')) { 
                hide(authOverlay); show(infoOverlay); 
            }
        };
    }
    
    // 4. Info -> All Done (Вхід виконано!)
    if (infoContinueBtn) {
        infoContinueBtn.onclick = () => { 
            if (infoContinueBtn.classList.contains('active')) { 
                hide(infoOverlay); show(doneOverlay); 
                userLoggedIn(); // <--- АБО ТУТ
            } 
        };
    }
    
    // Info Later -> Вхід виконано
    if (infoLaterBtn) {
        infoLaterBtn.onclick = () => { 
            hide(infoOverlay); 
            userLoggedIn(); // <--- АБО ТУТ
        };
    }

    // 5. Фінал
    if (checkProfileBtn) checkProfileBtn.onclick = () => { window.location.href = 'account.html'; };
    if (continueBookingBtn) continueBookingBtn.onclick = () => { hide(doneOverlay); userLoggedIn(); };

    // --- Активація полів ---
    function handleInputs(inputClass, btnId) {
        const inputs = document.querySelectorAll(inputClass);
        const btn = document.getElementById(btnId);
        if (!btn || inputs.length === 0) return;

        const checkInputs = () => {
            let allFilled = true;
            inputs.forEach(i => { if (i.value.trim() === "") allFilled = false; });
            if (allFilled) btn.classList.add('active'); else btn.classList.remove('active');
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
};

/* Бронювання */
const bronBtn = document.getElementById('bronBtn'); 
const bronTwoBtn = document.getElementById('bronTwoBtn'); 
if (bronBtn) bronBtn.onclick = () => { window.location.href = 'index_bron.html'; };
if (bronTwoBtn) bronTwoBtn.onclick = () => { window.location.href = 'index_bron2.html'; };
