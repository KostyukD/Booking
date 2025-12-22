window.onload = function () {

    // 1. Находим все нужные элементы
    const signInOverlay = document.getElementById('modalOverlay');
    const registerOverlay = document.getElementById('registerOverlay');
    const authOverlay = document.getElementById('authOverlay');
    const infoOverlay = document.getElementById('infoOverlay');
    const doneOverlay = document.getElementById('doneOverlay'); // НОВОЕ

    const openSignInBtn = document.getElementById('openSignIn');
    const openRegisterBtn = document.getElementById('openRegisterHeader');

    const closeSignInBtn = document.getElementById('closeModal');
    const closeRegisterBtn = document.getElementById('closeRegister');
    const closeAuthBtn = document.getElementById('closeAuth');
    const closeInfoBtn = document.getElementById('closeInfo');
    const closeDoneBtn = document.getElementById('closeDone'); // НОВОЕ

    // Ссылки для перехода
    const linkToRegister = document.getElementById('linkToRegister');
    const linkToSignIn = document.getElementById('linkToSignIn');

    // Кнопки и инпуты
    const authCodeInput = document.getElementById('authCodeInput');
    const authContinueBtn = document.getElementById('authContinueBtn');
    const regContinueBtn = document.getElementById('regContinueBtn');
    const infoContinueBtn = document.getElementById('infoContinueBtn');
    const infoLaterBtn = document.getElementById('infoLaterBtn');
    const continueBookingBtn = document.getElementById('continueBookingBtn'); // НОВОЕ

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

    // 3. Логика кнопок хедера
    if (openSignInBtn) openSignInBtn.onclick = () => show(signInOverlay);
    if (openRegisterBtn) openRegisterBtn.onclick = () => show(registerOverlay);

    // 4. Логика крестиков (закрытие окон)
    if (closeSignInBtn) closeSignInBtn.onclick = () => hide(signInOverlay);
    if (closeRegisterBtn) closeRegisterBtn.onclick = () => hide(registerOverlay);
    if (closeAuthBtn) closeAuthBtn.onclick = () => hide(authOverlay);
    if (closeInfoBtn) closeInfoBtn.onclick = () => hide(infoOverlay);
    if (closeDoneBtn) closeDoneBtn.onclick = () => hide(doneOverlay); // НОВОЕ

    // 5. Логика перехода (ВХОД -> РЕГИСТРАЦИЯ)
    if (linkToRegister) {
        linkToRegister.onclick = function (e) {
            e.preventDefault();
            hide(signInOverlay);
            show(registerOverlay);
        };
    }

    // 6. Логика перехода (РЕГИСТРАЦИЯ -> ВХОД)
    if (linkToSignIn) {
        linkToSignIn.onclick = function (e) {
            e.preventDefault();
            hide(registerOverlay);
            show(signInOverlay);
        };
    }

    // 7. Закрытие по клику на фон (обновлено для всех окон)
    window.onclick = function (event) {
        if (event.target === signInOverlay) hide(signInOverlay);
        if (event.target === registerOverlay) hide(registerOverlay);
        if (event.target === authOverlay) hide(authOverlay);
        if (event.target === infoOverlay) hide(infoOverlay);
        if (event.target === doneOverlay) hide(doneOverlay);
    };

    // 8. Логика фиолетовой кнопки (активация при заполнении)
    function handleInputs(inputClass, btnId) {
        const inputs = document.querySelectorAll(inputClass);
        const btn = document.getElementById(btnId);
        if (!btn) return;

        inputs.forEach(input => {
            input.oninput = () => {
                let filled = true;
                inputs.forEach(i => { if (i.value.trim() === "") filled = false; });
                if (filled) btn.classList.add('active');
                else btn.classList.remove('active');
            };
        });
    }

    handleInputs('.login-input', 'loginContinueBtn');
    handleInputs('.reg-input', 'regContinueBtn');
    handleInputs('.info-input', 'infoContinueBtn');
    handleInputs('.auth-input', 'authContinueBtn');

    // 9. ЦЕПОЧКА РЕГИСТРАЦИИ

    // Регистрация -> Верификация
    if (regContinueBtn) {
        regContinueBtn.addEventListener('click', function () {
            if (regContinueBtn.classList.contains('active')) {
                hide(registerOverlay);
                show(authOverlay);
            }
        });
    }

    // Верификация (1234) -> Информация
    if (authContinueBtn) {
        authContinueBtn.onclick = function () {
            if (authCodeInput.value === "1234") {
                hide(authOverlay);
                show(infoOverlay);
            } else {
                alert("Wrong code! Please try 1234");
                authCodeInput.style.borderColor = "red";
            }
        };
    }

    // Информация -> Успех (All done!)
    if (infoContinueBtn) {
        infoContinueBtn.onclick = () => {
            if (infoContinueBtn.classList.contains('active')) {
                hide(infoOverlay);
                show(doneOverlay);
            }
        };
    }

    // Кнопка "Later" в информации тоже ведет к успеху или просто закрывает
    if (infoLaterBtn) {
        infoLaterBtn.onclick = () => {
            hide(infoOverlay);
            show(doneOverlay);
        };
    }

    // Финальная кнопка "Continue booking"
    if (continueBookingBtn) {
        continueBookingBtn.onclick = () => {
            hide(doneOverlay);
            // Можно добавить перезагрузку или переход на главную
            console.log("Registration complete!");
        };
    }
};
