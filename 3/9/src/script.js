const voice = document.querySelector('.voice');
const radio = document.getElementsByName('inlineRadioOptions');

let pet = "";

// слушаеь нажатие единственной кнопки
voice.addEventListener('click', () => {
    let count = radio.length;
    //т.к. у нас радио-метка, чтобы найти прожатую - перебираю все
    for (let i = 0; i < count; i++) {
        console.log('click');
        // если находится отмеченная метка, передаем данные голосования на сервер
        if (radio[i].checked) {
            pet = radio[i].id;
            job(pet);
            return pet;
        }
    }
});

// функция отправки данных на удаленный сервер
async function job(pet) {
    // методом POST
    try {
        await fetch(`https://sf-pyw.mosyag.in/sse/vote/${pet}`,
            {method: 'POST',}
        );
        // редирект на страницу статистики
        window.location.replace('./templates/stat.html');
    // вывод ошибки, если что-то пошло не так
    } catch( e ) {
        console.error(e);
        alert('Please try again');
    }
}

