document.addEventListener("DOMContentLoaded", function () {


    ///////////////////////// POBOČKA-TÉMATIKA-HLAVNÝ_CHOD
    const branchSelect = document.getElementById("branch");
    const themeSelect = document.getElementById("theme");
    const mainDishSelect = document.getElementById("main-dish");

    const themesByBranch = {
        Bratislava: ["Taliansko", "Gŕecko"],
        Košice: ["Španielsko", "Japonsko"],
        Banská_Bystrica: ["India", "Mexiko"],
    };

    const mainDishesByTheme = {
        "Taliansko": ["Pizza", "Pasta", "Risotto"],
        "Gŕecko": ["Moussaka", "Souvlaki", "Tzatziki"],
        "Španielsko": ["Paella", "Tapas", "Gazpacho"],
        "Japonsko": ["Sushi", "Tempura", "Ramen"],
        "India": ["Curry", "Biryani", "Naan"],
        "Mexiko": ["Taco", "Burrito", "Guacamole"],
    };

    function updateThemes() {
        const selectedBranch = branchSelect.value;
        themeSelect.innerHTML = "";

        if (selectedBranch in themesByBranch) {
            const themes = themesByBranch[selectedBranch];
            themes.forEach(function (theme) {
                const option = document.createElement("option");
                option.value = theme;
                option.textContent = theme;
                themeSelect.appendChild(option);
            });
        }

        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.textContent = "Vyberte tématiku";
        themeSelect.insertBefore(defaultOption, themeSelect.firstChild);

        updateMainDishes();
    }

    function updateMainDishes() {
        const selectedTheme = themeSelect.value;
        mainDishSelect.innerHTML = "";

        if (selectedTheme in mainDishesByTheme) {
            const mainDishes = mainDishesByTheme[selectedTheme];
            mainDishes.forEach(function (mainDish) {
                const option = document.createElement("option");
                option.value = mainDish;
                option.textContent = mainDish;
                mainDishSelect.appendChild(option);
            });
        }

        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.textContent = "Vyberte hlavný chod";
        mainDishSelect.insertBefore(defaultOption, mainDishSelect.firstChild);
    }

    branchSelect.addEventListener("change", updateThemes);
    themeSelect.addEventListener("change", updateMainDishes);
    updateThemes();
    updateMainDishes();


    ///////////////////////////////// other option
    const option4Checkbox = document.getElementById("option4");
    const otherOptionRow = document.getElementById("other-option-row");
    const otherOptionInput = document.getElementById("other-option");
    const radioButtons = document.querySelectorAll('input[type="radio"][name="options"]')

    function toggleOtherOption() {
        if (option4Checkbox.checked) {
            otherOptionRow.style.display = "block";
        } else {
            otherOptionRow.style.display = "none";
            otherOptionInput.value = ""; // Vyčistiť textové pole
        }
    }

    radioButtons.forEach(function(radioButton) {
        radioButton.addEventListener("change", toggleOtherOption);
    });

    option4Checkbox.addEventListener("change", toggleOtherOption);
    toggleOtherOption();


    /////////////////////////////// ÁNO | NIE
    var yesRadio = document.getElementById("yes");
    var noRadio = document.getElementById("no");
    var yesField = document.getElementById("yes-field");
    var noField = document.getElementById("no-field");

    yesRadio.addEventListener("change", function () {
        if (yesRadio.checked) {
            yesField.style.display = "block";
            noField.style.display = "none";
        }
    });

    noRadio.addEventListener("change", function () {
        if (noRadio.checked) {
            noField.style.display = "block";
            yesField.style.display = "none";
        }
    });


    /////////////////////////////// countre
    function initCharCounter(inputId, counterId) {
        const input = document.getElementById(inputId);
        const charCounter = document.getElementById(counterId);

        input.addEventListener("input", function () {
            const currentLength = input.value.length;
            const maxLength = input.maxLength;

            charCounter.textContent = `${currentLength} / ${maxLength}`;
        });
    }

    initCharCounter("other-option", "other-option_c");
    initCharCounter("first-name", "first-name_c");
    initCharCounter("last-name", "last-name_c");
    initCharCounter("yes-answer", "yes-answer_c");
    initCharCounter("no-answer", "no-answer_c");
    initCharCounter("email", "email_c");
    initCharCounter("phone-number", "phone-number_c");


    ///////////////////////////// buduci datum
    function checkDate() {
        const birthDateInput = document.getElementById("birth-date");
        const currentDate = new Date();
        const selectedDate = new Date(birthDateInput.value);

        if (selectedDate > currentDate) {
            document.getElementById("error-mess-birth-date").textContent = "Nemôžete zadať budúci dátum.";
            birthDateInput.value = "";
            birthDateInput.style.backgroundColor = '#ffbaba';
            ageInput.value = "";
        } else {
            document.getElementById("error-mess-birth-date").textContent = "";
        }
    }

    const birthDateInput = document.getElementById("birth-date");
    birthDateInput.addEventListener("change", checkDate);


    /////////////////////////// minuly datum (date)
    function restrictFutureDate() {
        const dateInput = document.getElementById("date");
        const currentDate = new Date();
        const selectedDate = new Date(dateInput.value);

        if (selectedDate < currentDate) {
            document.getElementById("error-mess-date").textContent = "Nemôžete zadať dátum z minulosti";
            dateInput.value = "";
            dateInput.style.backgroundColor = '#ffbaba';
        } else {
            document.getElementById("error-mess-date").textContent = "";
            dateInput.style.backgroundColor = '';
        }
    }

    const dateInput = document.getElementById("date");
    dateInput.addEventListener("change", restrictFutureDate);


    ///////////////////////////// age
    // Najdeme vstupy pro datum narození a věk
    const ageInput = document.getElementById("age");
    birthDateInput.addEventListener("input", calculateAge);

    function calculateAge() {
        const birthDate = new Date(birthDateInput.value);
        const today = new Date();
        // Aktualizujeme vstup pro věk
        ageInput.value = today.getFullYear() - birthDate.getFullYear();
    }


    //////////////////////// Skryte pole
    const toggleHiddenNameButton = document.getElementById("show-hidden-name");
    const hiddenNameDiv = document.getElementById("hidden-name");
    let isHidden = true;

    toggleHiddenNameButton.addEventListener("click", function () {
        if (isHidden) {
            hiddenNameDiv.style.display = "block";
            hiddenNameDiv.textContent = "Vytvoril: Adam Puvák";
        } else {
            hiddenNameDiv.style.display = "none";
            hiddenNameDiv.textContent = "";
        }

        isHidden = !isHidden;
    });


    //////////////////////// Povinne polia (pri opusteni pola)
    function validateInput(inputId, errorMessageId) {
        const inputElement = document.getElementById(inputId);
        const errorMessageElement = document.getElementById(errorMessageId);

        inputElement.addEventListener("blur", function () {
            if (!inputElement.value) {
                errorMessageElement.textContent = "Toto je povinný údaj";
                inputElement.style.backgroundColor = '#ffbaba';
            } else {
                errorMessageElement.textContent = "";
                inputElement.style.backgroundColor = '#D0E7D2';
            }
        });
    }

    validateInput("branch", "error-mess-branch");
    validateInput("date", "error-mess-date");
    validateInput("theme", "error-mess-theme");
    validateInput("time", "error-mess-time");
    validateInput("main-dish", "error-mess-main-dish");
    validateInput("no-people", "error-mess-no-people");
    validateInput("first-name", "error-mess-first-name");
    validateInput("last-name", "error-mess-last-name");
    validateInput("birth-date", "error-mess-birth-date");
    validateInput("gender", "error-mess-gender");


    /////////////////////////////// mail validácia
    const emailInput = document.getElementById('email');
    const emailCounter = document.getElementById('email_c');
    const errorMessage = document.getElementById('error-mess-mail');

    emailInput.addEventListener('blur', function() {
        const email = emailInput.value;
        const emailRegex = /^[a-zA-Z0-9._%+-]{3,}@([a-zA-Z0-9-]{2,}\.){1,}[a-zA-Z]{2,4}$/;

        if (emailRegex.test(email)) {
            emailInput.style.backgroundColor = '#D0E7D2';
            errorMessage.textContent = '';
        } else if (!emailInput.value) {
            emailInput.style.backgroundColor = '#ffbaba';
            errorMessage.textContent = 'Toto je povinný údaj';
        }
        else {
            emailInput.style.backgroundColor = '#ffbaba';
            errorMessage.textContent = 'Neplatná e-mailová adresa';
        }

        emailCounter.textContent = email.length + ' / 30';
    });


    //////// validácia povinných vstupov
    function validateForm() {
        const branchInput = document.getElementById("branch");
        const dateInput = document.getElementById("date");
        const themeInput = document.getElementById("theme");
        const timeInput = document.getElementById("time");
        const mainDishInput = document.getElementById("main-dish");
        const noPeopleInput = document.getElementById("no-people");
        const firstNameInput = document.getElementById("first-name");
        const lastNameInput = document.getElementById("last-name");
        const birthDateInput = document.getElementById("birth-date");
        const genderInput = document.getElementById("gender");

        const requiredInputs = [branchInput, dateInput, themeInput, timeInput,
            mainDishInput, noPeopleInput, firstNameInput, lastNameInput, birthDateInput, genderInput];        const errorFields = [];

        function validateRequiredField(inputElement) {
            if (!inputElement.value) {
                displayError(inputElement);
                return false;
            } else {
                clearError(inputElement);
                return true;
            }
        }

        for (const input of requiredInputs) {
            if (!input.value) {
                displayError(input);
                errorFields.push(input);
            }
            else {
                clearError(input);
            }
        }

        function displayError(inputElement) {
            const errorContainer = inputElement.nextElementSibling;
            errorContainer.textContent = "Toto je povinný údaj";
            inputElement.style.backgroundColor = '#ffbaba';
            errorFields.push(inputElement);
        }

        function clearError(inputElement) {
            const errorContainer = inputElement.nextElementSibling;
            errorContainer.textContent = '';
            inputElement.style.backgroundColor = '#D0E7D2';
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!emailRegex.test(emailInput.value)) {
            displayError(emailInput, "Toto je povinný údaj");
        } else {
            clearError(emailInput);
        }

        if (errorFields.length > 0) {
            errorFields[0].focus();
            return false;
        }

        return true;
    }


    ///////////////////////////////// Modal
    const openModalButton = document.getElementById("open-modal-button");
    openModalButton.addEventListener("click", function(event) {
        event.preventDefault();

        if (validateForm()) {
            openModal();
        }
    });

    const modal = document.getElementById("order-summary-modal");

    function openModal() {
        modal.style.display = "block";
        const modalContentContainer = document.getElementById("modal-content-container");

        const elementLabels = {
            'branch': 'Pobočka',
            'theme': 'Tématika',
            'main-dish': 'Hlavný chod',
            'date': 'Dátum',
            'time': 'Čas',
            'no-people': 'Počet osôb'
        };

        for (const id in elementLabels) {
            const element = document.getElementById(id);
            let value;

            if (element.tagName === 'SELECT') {
                value = element.selectedOptions[0].textContent;
            } else {
                value = element.value;
            }

            const elementToAppend = document.createElement('p');
            elementToAppend.className = "modal-info";
            elementToAppend.textContent = `${elementLabels[id]}: ${value}`;

            modalContentContainer.appendChild(elementToAppend);
        }
    }

    function closeModal() {
        modal.style.display = "none";
        const modalInfoElements = document.querySelectorAll('.modal-info');
        modalInfoElements.forEach(element => element.remove());
    }

    const closeButton = document.getElementById("close-modal");
    closeButton.addEventListener("click", closeModal);
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });


    ///////////////////////////////// Cena
    function calculatePrice() {
        const branch = document.getElementById('branch').value;
        const theme = document.getElementById('theme').value;
        const noPeople = document.getElementById('no-people').value;

        let price = 0;

        if (branch === 'Bratislava') {
            price += 10;
        } else if (branch === 'Košice') {
            price += 7;
        } else if (branch === 'Banská_Bystrica') {
            price += 5;
        }

        // Přidání logiky pro výpočet ceny na základě vybrané tématiky
        if (theme === 'Taliansko' || theme === 'Španielsko' || theme === 'India') {
            price += 10;
        } else if (theme === 'Grécko' || theme === 'Japonsko' || theme === 'Mexiko') {
            price += 7;
        }

        price *= noPeople;

        return price;
    }

    function updateModalContent() {
        const price = calculatePrice();
        const priceElement = document.getElementById('price-value'); // Získání elementu pro cenu

        priceElement.textContent = price;
    }

    document.getElementById('branch').addEventListener('change', updateModalContent);
    document.getElementById('theme').addEventListener('change', updateModalContent);
    document.getElementById('no-people').addEventListener('change', updateModalContent);

});