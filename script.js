window.onload = function () {

    // 1. Находим все элементы
    const signInOverlay = document.getElementById('modalOverlay');
    const registerOverlay = document.getElementById('registerOverlay');
    const authOverlay = document.getElementById('authOverlay');
    const infoOverlay = document.getElementById('infoOverlay');
    const doneOverlay = document.getElementById('doneOverlay');

    const openSignInBtn = document.getElementById('openSignIn');
    const openRegisterBtn = document.getElementById('openRegisterHeader');
    const openRegisterFooterBtn = document.getElementById('openRegisterFooter'); 

    const closeSignInBtn = document.getElementById('closeModal');
    const closeRegisterBtn = document.getElementById('closeRegister');
    const closeAuthBtn = document.getElementById('closeAuth');
    const closeInfoBtn = document.getElementById('closeInfo');
    const closeDoneBtn = document.getElementById('closeDone');

    const linkToRegister = document.getElementById('linkToRegister');
    const linkToSignIn = document.getElementById('linkToSignIn');

    const authCodeInput = document.getElementById('authCodeInput');
    const authContinueBtn = document.getElementById('authContinueBtn');
    const regContinueBtn = document.getElementById('regContinueBtn');
    const infoContinueBtn = document.getElementById('infoContinueBtn');
    const infoLaterBtn = document.getElementById('infoLaterBtn');
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

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                let allFilled = true;
                inputs.forEach(i => { if (i.value.trim() === "") allFilled = false; });
                
                if (allFilled) btn.classList.add('active');
                else btn.classList.remove('active');
            });
        });
    }

    handleInputs('.login-input', 'loginContinueBtn');
    handleInputs('.reg-input', 'regContinueBtn');
    handleInputs('.auth-input', 'authContinueBtn');
    handleInputs('.info-input', 'infoContinueBtn');

    // 8. Цепочка шагов
    if (regContinueBtn) {
        regContinueBtn.onclick = () => { if (regContinueBtn.classList.contains('active')) { hide(registerOverlay); show(authOverlay); } };
    }
    if (authContinueBtn) {
        authContinueBtn.onclick = () => {
            if (authCodeInput.value === "1234") { hide(authOverlay); show(infoOverlay); }
            else { alert("Try 1234"); authCodeInput.style.borderColor = "red"; }
        };
    }
    if (infoContinueBtn) {
        infoContinueBtn.onclick = () => { if (infoContinueBtn.classList.contains('active')) { hide(infoOverlay); show(doneOverlay); } };
    }
    if (infoLaterBtn) infoLaterBtn.onclick = () => { hide(infoOverlay); show(doneOverlay); };
    if (continueBookingBtn) continueBookingBtn.onclick = () => hide(doneOverlay);
};
