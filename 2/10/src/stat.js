const prBar =  document.getElementsByClassName('v');

// обозначаем EventSource
const ES = new EventSource('https://sf-pyw.mosyag.in/sse/vote/stats');

// отлавливаем ошибки, если они есть
ES.onerror = error => {
    if (ES.readyState) {
        prBar.forEach(progr => progr.textContent = "Some error");
    } else {null;}
    console.log(error);
};

// и смотрим ответ на наш запрос получения статистики
ES.onmessage = message => {
    // парсим json
    let rsep = JSON.parse(message.data);
    let count = prBar.length;
    let totalVotes = 0;
    // узнаем сколько всего голосов отдано за трех животных, чтобы по
    // этим данным расчитать процент голосов по каждому домашнему животному
    for (let i = 0; i < count; i++) {
        totalVotes += rsep[prBar[i].id];
        }

    // теперь мы знаем сколько голосов, расчитываем для них процент
    // добавляем процент голосов в соответствующей ему прогрессбар
    for (let i = 0; i < count; i++) {
        let petID = prBar[i].id;
        prBar[i].style.cssText = `width: ${rsep[petID] * 100 / totalVotes}%;`;
        prBar[i].textContent = `${rsep[petID]} votes`;
    };
};
