const sent = document.querySelector('.sent');
const clear = document.querySelector('.clear');
const save = document.querySelector('.save');
const checkBoxes = document.getElementsByName('checkB');
const inpCity = document.getElementById('town');

let count = checkBoxes.length;
getCity();
getBoxes();

// слушаем кнопку сохранить город
save.addEventListener('click', () => {
    if (sessionStorage.getItem('city') == null) {
        // если в куках нет переменной города, вызываем функцию, которая устанавливает данную переменную
        city();
        // прячем кнопку Сохранить
        save.style.display = "none";
    }
})

// слушаем кнопку очистки куки города
clear.addEventListener('click', () => {
    // удаляем из переменных кукисов и обнуляем строку ввода города
    sessionStorage.removeItem('city');
    inpCity.value = null;
    // показываем кнопку Сохранить
    save.style.display = "inline-block";
})

// слушаем кнопку отправки галочек, вызываем необходимые функции
sent.addEventListener('click', () => {
    setBoxes();
    getBoxes();
})

// получить куку, содержащую город
function getCity() {
    inpCity.value = sessionStorage.getItem('city');
    if (sessionStorage.getItem('city')) {
        // если она существует, спрятать кнопку сохранить
        save.style.display = "none";
    }
}


// функция установки переменной city из поля ввода
function city() {
    let cityName = inpCity.value
    // устанавливаем переменную
    sessionStorage.setItem('city', cityName);

}

// установка куков отмеченных сендбоксов
function setBoxes() {
    // перебираю все checkbox чтобы найти отмеченные
    for (let i = 0; i < count; i++) {
        // если флаг checked проставлен, добавляем куку
        if (checkBoxes[i].checked) {
            sessionStorage.setItem(checkBoxes[i].id, checkBoxes[i].checked)
        }
    }
}

//получение кукисов чекбоксов
function getBoxes() {
    let countCheck = 0;
    // так же перебираем все боксы
    for (let i = 0; i < count; i++) {
        // если находим в куке ключ бокса, проставляем checked true
        if (sessionStorage.getItem(checkBoxes[i].id)) {
            checkBoxes[i].checked = sessionStorage.getItem(checkBoxes[i].id);
            countCheck ++ ;
        }
    }
    // если в куке установлено больше, чем 0 чекбоксов
    if (countCheck > 0) {
        // скрываем кнопку "Отправить"
        sent.style.display = "none";
        //дизейблим все чекбоксы, чтобы невозможно было переопределить
        for (let i = 0; i < count; i++) {
            checkBoxes[i].disabled = true;
        }
    }
}

// функция удаления кукисов чекбоксов (для тестировани)
function delTestFunc() {
    for (let i = 0; i < count; i++) {
        checkBoxes[i].checked = sessionStorage.removeItem(checkBoxes[i].id);
        checkBoxes[i].disabled = false;
        }
    sent.style.display = "block";
};