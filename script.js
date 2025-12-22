window.onload = function () {

    // 1. Находим все нужные элементы
    const signInOverlay = document.getElementById('modalOverlay');
    const registerOverlay = document.getElementById('registerOverlay');

    const openSignInBtn = document.getElementById('openSignIn');
    const openRegisterBtn = document.getElementById('openRegisterHeader');

    const closeSignInBtn = document.getElementById('closeModal');
    const closeRegisterBtn = document.getElementById('closeRegister');

    // Те самые ссылки для перехода
    const linkToRegister = document.getElementById('linkToRegister');
    const linkToSignIn = document.getElementById('linkToSignIn');

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

    // 4. Логика крестиков
    if (closeSignInBtn) closeSignInBtn.onclick = () => hide(signInOverlay);
    if (closeRegisterBtn) closeRegisterBtn.onclick = () => hide(registerOverlay);

    // 5. ЛОГИКА ПЕРЕХОДА (ВХОД -> РЕГИСТРАЦИЯ)
    if (linkToRegister) {
        linkToRegister.onclick = function (e) {
            e.preventDefault(); // Отменяем перезагрузку страницы
            hide(signInOverlay); // Сначала закрываем вход
            show(registerOverlay); // Затем открываем регистрацию
        };
    }

    // 6. ЛОГИКА ПЕРЕХОДА (РЕГИСТРАЦИЯ -> ВХОД)
    if (linkToSignIn) {
        linkToSignIn.onclick = function (e) {
            e.preventDefault();
            hide(registerOverlay);
            show(signInOverlay);
        };
    }

    // 7. Закрытие по клику на фон
    window.onclick = function (event) {
        if (event.target === signInOverlay) hide(signInOverlay);
        if (event.target === registerOverlay) hide(registerOverlay);
    };

    // 8. Логика фиолетовой кнопки
    function handleInputs(inputClass, btnId) {
        const inputs = document.querySelectorAll(inputClass);
        const btn = document.getElementById(btnId);
        
        // Проверка: находит ли JS кнопку и инпуты?
        if (!btn || inputs.length === 0) {
            console.warn("Предупреждение: Не найдены элементы для", inputClass, btnId);
            return;
        }

        inputs.forEach(input => {
            // Используем 'input' вместо 'oninput' для надежности
            input.addEventListener('input', () => {
                let allFilled = true;
                
                inputs.forEach(i => {
                    if (i.value.trim() === "") {
                        allFilled = false;
                    }
                });

                if (allFilled) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        });
    }

    // Вызываем строго после объявления функции
    handleInputs('.login-input', 'loginContinueBtn');
    handleInputs('.reg-input', 'regContinueBtn');
};
