window.onload = function () {

    // 1. Находим все элементы
    const signInOverlay = document.getElementById('modalOverlay');
    const registerOverlay = document.getElementById('registerOverlay');
    const authOverlay = document.getElementById('authOverlay');
    const infoOverlay = document.getElementById('infoOverlay');
    const doneOverlay = document.getElementById('doneOverlay');

    // Елементи ХЕДЕРА (для заміни кнопок на фото)
    const authButtonsContainer = document.getElementById('authButtonsContainer');
    const userProfileHeader = document.getElementById('userProfileHeader');

    // Кнопки відкриття
    const openSignInBtn = document.getElementById('openSignIn');
    const openRegisterBtn = document.getElementById('openRegisterHeader');
    const openRegisterFooterBtn = document.querySelector('.register-purple-btn'); 

    // Кнопки закриття
    const closeSignInBtn = document.getElementById('closeModal');
    const closeRegisterBtn = document.getElementById('closeRegister');
    const closeAuthBtn = document.getElementById('closeAuth');
    const closeInfoBtn = document.getElementById('closeInfo');
    const closeDoneBtn = document.getElementById('closeDone');

    // Посилання
    const linkToRegister = document.getElementById('linkToRegister');
    const linkToSignIn = document.getElementById('linkToSignIn');

    // Кнопки "Continue" та інпути
    const authCodeInput = document.getElementById('authCodeInput');
    const authContinueBtn = document.getElementById('authContinueBtn');
    const regContinueBtn = document.getElementById('regContinueBtn');
    
    // Кнопки у вікні Information
    const infoContinueBtn = document.getElementById('infoContinueBtn');
    const infoLaterBtn = document.getElementById('infoLaterBtn');
    
    // Кнопки у вікні All Done
    const checkProfileBtn = document.getElementById('checkProfileBtn'); 
    const continueBookingBtn = document.getElementById('continueBookingBtn');

    // 2. Универсальные функции
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

    // 3. Открытие окон
    if (openSignInBtn) openSignInBtn.onclick = () => show(signInOverlay);
    if (openRegisterBtn) openRegisterBtn.onclick = () => show(registerOverlay);
    if (openRegisterFooterBtn) openRegisterFooterBtn.onclick = () => show(registerOverlay);

    // 4. Закрытие (крестики)
    if (closeSignInBtn) closeSignInBtn.onclick = () => hide(signInOverlay);
    if (closeRegisterBtn) closeRegisterBtn.onclick = () => hide(registerOverlay);
    if (closeAuthBtn) closeAuthBtn.onclick = () => hide(authOverlay);
    if (closeInfoBtn) closeInfoBtn.onclick = () => hide(infoOverlay);
    if (closeDoneBtn) closeDoneBtn.onclick = () => hide(doneOverlay);

    // 5. Переходы между окнами
    if (linkToRegister) {
        linkToRegister.onclick = (e) => { e.preventDefault(); hide(signInOverlay); show(registerOverlay); };
    }
    if (linkToSignIn) {
        linkToSignIn.onclick = (e) => { e.preventDefault(); hide(registerOverlay); show(signInOverlay); };
    }

    // 6. Закрытие по фону
    window.onclick = function (event) {
        if (event.target === signInOverlay) hide(signInOverlay);
        if (event.target === registerOverlay) hide(registerOverlay);
        if (event.target === authOverlay) hide(authOverlay);
        if (event.target === infoOverlay) hide(infoOverlay);
        if (event.target === doneOverlay) hide(doneOverlay);
    };

    // 7. Функция активации кнопок (фиолетовый цвет)
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

    // 8. ЛАНЦЮЖОК ВІКОН
    
    // Крок 1: Register -> Auth
    if (regContinueBtn) {
        regContinueBtn.onclick = () => { 
            if (regContinueBtn.classList.contains('active')) { 
                hide(registerOverlay); 
                show(authOverlay); 
            } 
        };
    }

    // Крок 2: Auth -> Info
    if (authContinueBtn) {
        authContinueBtn.onclick = () => {
            if (authContinueBtn.classList.contains('active')) { 
                hide(authOverlay); 
                show(infoOverlay); 
            }
        };
    }
    
    // Крок 3: Info -> All Done (ТУТ МІНЯЄМО ХЕДЕР)
    if (infoContinueBtn) {
        infoContinueBtn.onclick = () => { 
            if (infoContinueBtn.classList.contains('active')) { 
                hide(infoOverlay); 
                show(doneOverlay); 
                
                // --- ЗМІНА ХЕДЕРА: Ховаємо кнопки, показуємо фото ---
                if (authButtonsContainer) authButtonsContainer.style.display = 'none';
                if (userProfileHeader) userProfileHeader.style.display = 'block';
                // ----------------------------------------------------
            } 
        };
    }
    
    if (infoLaterBtn) {
        infoLaterBtn.onclick = () => { 
            hide(infoOverlay); 
            // Якщо натиснули "Later", теж вважаємо, що вхід виконано (опціонально)
            if (authButtonsContainer) authButtonsContainer.style.display = 'none';
            if (userProfileHeader) userProfileHeader.style.display = 'block';
        };
    }

    // Крок 4: All Done -> Account Page
    if (checkProfileBtn) {
        checkProfileBtn.onclick = () => {
            window.location.href = 'account.html';
        };
    }

    if (continueBookingBtn) {
        continueBookingBtn.onclick = () => {
            hide(doneOverlay);
            // Тут теж переконуємось, що хедер оновлений, якщо вікно закрили
            if (authButtonsContainer) authButtonsContainer.style.display = 'none';
            if (userProfileHeader) userProfileHeader.style.display = 'block';
        };
    }
};
