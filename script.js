"use_strict";


//max incomes
let maxIncomes = {
    '01.01.2009':'415000',
    '01.01.2010':'415000',
    '01.01.2011':'463000',
    '01.01.2012':'512000',
    '01.01.2013':'568000',
    '01.01.2014':'624000',
    '01.01.2015':'670000',
    '01.01.2016':'718000',
    '01.01.2017':'755000',
    '01.01.2018':'815000',
    '01.01.2019':'865000',
    '01.01.2020':'912000',
    '01.01.2021':'966000',
    '01.01.2022':'1032000'
};

function getMaxIncomes() {
    
    getElement("https://portal.fss.ru/fss/sicklist/guest","script", function(element) {

        const maxIncomesObj = {};

        const maxIncomesPosition = element[4].innerHTML.indexOf("maxIncomes = ");
        const maxIncomesString = element[4].innerHTML.slice(maxIncomesPosition + "maxIncomes = ".length);
        const maxIncomesArray = maxIncomesString.match(/'\d{2}\.\d{2}\.\d{4}':'\d{5,}'/igm);

        maxIncomesArray.forEach(element => {
            element = element.split(":");
            const date = element[0].slice(1,-1);
            const money = element[1].slice(1, -1);
            maxIncomesObj[date] = money;
        });

        console.log(maxIncomesObj);
        return maxIncomesObj;
    });
}

function getElement(url, selector, func) {
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
    .then(response => {
      if (response.ok) {return response.text();}
      throw new Error('Network response was not ok.');
    })
    .then(data => {
        const html = document.createElement("div");
        html.innerHTML = data;
        func(html.querySelectorAll(selector));
        });
}



//Calendar

// const calendar = document.getElementById("calendar");

// function createCalendar(elem, year, month) {
 
//     let mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
//     let d = new Date(year, mon);
   
//     let table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';
   
//     // пробелы для первого ряда
//     // с понедельника до первого дня месяца
//     // * * * 1  2  3  4
//     for (let i = 0; i < getDay(d); i++) {
//       table += '<td></td>';
//     }
   
//     // <td> ячейки календаря с датами
//     while (d.getMonth() == mon) {
//       table += '<td>' + d.getDate() + '</td>';
   
//       if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
//         table += '</tr><tr>';
//       }
   
//       d.setDate(d.getDate() + 1);
//     }
   
//     // добить таблицу пустыми ячейками, если нужно
//     // 29 30 31 * * * *
//     if (getDay(d) != 0) {
//       for (let i = getDay(d); i < 7; i++) {
//         table += '<td></td>';
//       }
//     }
   
//     // закрыть таблицу
//     table += '</tr></table>';
   
//     elem.innerHTML = table;
//   }

//   function getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
//     let day = date.getDay();
//     if (day == 0) {day = 7;} // сделать воскресенье (0) последним днем
//     return day - 1;
//   }


// const now = new Date();
// const currentYear = now.getFullYear();
// const currentMonth = now.getMonth() + 1;

// createCalendar(calendar, currentYear, currentMonth);


function Calendar2(id, year, month) {
    const Dlast = new Date(year, month + 1, 0).getDate(), //последний день в месяце
        D = new Date(year, month, Dlast), //полная дата последнего числа месяца
        DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(), //день недели первого числа
        DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay(); //день недели последнего числа
    let calendar = '<tr>';
        month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];


    if (DNfirst != 0) {
        for (let i = 1; i < DNfirst; i++) {calendar += '<td>';}
    } else {
        for (let i = 0; i < 6; i++) {calendar += '<td>';}
    }
    for (let i = 1; i <= Dlast; i++) {
        if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
            calendar += '<td class="today">' + i;
        } else {
            calendar += '<td>' + i;
        }
        if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
            calendar += '<tr>';
        }
    }
    for (var i = DNlast; i < 7; i++) {calendar += '<td>&nbsp;';}
    document.querySelector('#' + id + ' tbody').innerHTML = calendar;
    document.querySelector('#' + id + ' thead td:nth-child(2)').innerHTML = month[D.getMonth()] + ' ' + D.getFullYear();
    document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.month = D.getMonth();
    document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.year = D.getFullYear();
    if (document.querySelectorAll('#' + id + ' tbody tr').length < 6) { // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
        document.querySelector('#' + id + ' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
    }
}

Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
// переключатель минус месяц
document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(1)').addEventListener("click", () =>{
    Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month) - 1);
});

// переключатель плюс месяц
document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(3)').addEventListener("click", () => {
    Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month) + 1);
});


// function msToDays(value) {
//     const seconds = value / 1000;
//     const minutes = seconds / 60;
//     const hours = minutes / 60;
//     const days = hours / 24;
//     return days;
// }
// function daysToMs(value) {
//     const hours = value * 24;
//     const minutes = hours * 60;
//     const seconds = minutes * 60;
//     const ms = seconds * 1000;
//     return ms;
// }

const graphicD = [];

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;
const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
const startDate = new Date("01.02.2022");
const finishDate = new Date(currentYear, currentMonth, lastDay);



// for(let i = startDate.getTime(); i < finishDate.getTime(); i += daysToMs(6)) {
//     graphicD.push(new Date(i).toLocaleDateString());
//     graphicD.push(new Date(i + daysToMs(1)).toLocaleDateString());
//     graphicD.push(new Date(i + daysToMs(2)).toLocaleDateString());
// }

function daysPlus(date, days) {
    return date.setDate(date.getDate() + days);
}

function abc(time) {
    const now = new Date();

    for (let i = startDate; i < finishDate; daysPlus(i, 3)) {
        const day1 = new Date(i).toLocaleDateString();
        const day2 = new Date(daysPlus(i, 1)).toLocaleDateString();
        const day3 = new Date(daysPlus(i, 1)).toLocaleDateString();
        daysPlus(i, 1);

        graphicD.push(day1);
        graphicD.push(day2);
        graphicD.push(day3);
    }

    console.log(graphicD);

    time(now);
}

abc(function (now) {
    console.log(new Date() - now);
});


