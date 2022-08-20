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
        let scriptIndex;

        for(let i = 0; i < element.length; i++) {
            if(element[i].innerHTML.includes("maxIncomes = ")) { //находим номер скрипта с нужным значением
               scriptIndex = i;
            }
        }

        const maxIncomesPosition = element[scriptIndex].innerHTML.indexOf("maxIncomes = ");
        const maxIncomesString = element[scriptIndex].innerHTML.slice(maxIncomesPosition + "maxIncomes = ".length);
        const maxIncomesArray = maxIncomesString.match(/'\d{2}\.\d{2}\.\d{4}':'\d{5,}'/igm);



        maxIncomesArray.forEach(element => {
            element = element.split(":");
            const date = element[0].slice(1,-1);
            const money = element[1].slice(1, -1);
            maxIncomesObj[date] = money;
        });

        console.log(maxIncomesObj);
        // return maxIncomesObj;
    });
}

// https://api.allorigins.win/get?url=
// http://alloworigin.com/get?url=

function getElement(url, selector, func) {
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
    .then(response => {
      if (response.ok) {return response.text();}
      throw new Error('Network response was not ok.');
    })
    .then(data => {
        // console.log(data);
        data =  data.replace(/src=/gmi, ""); //убираем лишние ссылки
        const html = document.createElement("div");
        html.innerHTML = data;
        func(html.querySelectorAll(selector));
        });
}



function getGraphic(year, month, graphic) { //смены 14.1, 14.2, 16.1-1, 16.1-2, 16.2-1, 16.2-2;

const graphicD = [];

const now = new Date(year, month);
const currentYear = now.getFullYear(); // Текущий год
const currentMonth = now.getMonth(); // Текущий месяц
const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate(); // Последнее число текущего месяца
const firstDate = new Date(currentYear, currentMonth, 1); // Первая дата месяца
const finishDate = new Date(currentYear, currentMonth, lastDay); // Последняя дата месяца

let startDate; // Начало отсчёта смен 


switch (graphic) {

    case "14.1":
    case "16.1-2":
        startDate = new Date("2000/01/04"); 
        break;

    case "14.2":
    case "16.2-2":
        startDate = new Date("2000/01/07");
        break;

    case "16.1-1":
        startDate = new Date("2000/01/10"); 
        break;

    case "16.2-1":
        startDate = new Date("2000/01/01");
        break;
}


const dayOff = {
    type: "day-off",
    worked: false,
};
const morningDay = {
    type: "mdg",
    worked: true,
    time: 11.7,
};
const nightDay = {
    type: "ndg",
    worked: true,
    time: 11,
};

function daysPlus(date, days) {
    return date.setDate(date.getDate() + days);
}

function addDay(date, spread) {
    if (date <= finishDate && date >= firstDate) {
        const day = {
            date: new Date(date).toLocaleDateString(),
            dayWeek: [7, 1, 2, 3, 4, 5, 6][new Date(date).getDay()],
            ...spread
        };

        if (new Date(date).toLocaleDateString() === new Date().toLocaleDateString()) { day.today = true; }

        graphicD.push(day);
    }
}

 function findStartDate(daysInCycle) {

    for (startDate; startDate < firstDate; daysPlus(startDate, daysInCycle)) {} // Считаем дату начала смен в месяце

    if (startDate.getDate() !== 1) { // откатываем начало смен на прошлый месяц если это не первое число 
        daysPlus(startDate, -daysInCycle);
    }
 }

if (graphic === "14.1" || graphic === "14.2") {

    findStartDate(6);

    for (startDate; startDate <= finishDate; daysPlus(startDate, 1)) {
        addDay(startDate, morningDay);
        addDay(daysPlus(startDate, 1), morningDay);
        addDay(daysPlus(startDate, 1), morningDay);
        addDay(daysPlus(startDate, 1), dayOff);
        addDay(daysPlus(startDate, 1), dayOff);
        addDay(daysPlus(startDate, 1), dayOff);
    }
} else {

    findStartDate(12);

    for (startDate; startDate <= finishDate; daysPlus(startDate, 1)) {
        addDay(startDate, morningDay);
        addDay(daysPlus(startDate, 1), morningDay);
        addDay(daysPlus(startDate, 1), morningDay);
        addDay(daysPlus(startDate, 1), dayOff);
        addDay(daysPlus(startDate, 1), dayOff);
        addDay(daysPlus(startDate, 1), dayOff);
        addDay(daysPlus(startDate, 1), nightDay);
        addDay(daysPlus(startDate, 1), nightDay);
        addDay(daysPlus(startDate, 1), nightDay);
        addDay(daysPlus(startDate, 1), dayOff);
        addDay(daysPlus(startDate, 1), dayOff);
        addDay(daysPlus(startDate, 1), dayOff);
    }
}
// console.log(graphicD);
// console.log(graphicD.filter(day => day.type === "mdg").reduce((sum, current) => {return sum + current.time}, 0));
return graphicD;
}

getGraphic(new Date().getFullYear(), new Date().getMonth(), "16.1-1");

// Что нужно?
// Функция рендеринга перелистывания и выбора месяцев
// Функция рендеринга перелистывания и выбора лет
// Слушатель для каждого дня с модальным окном

function renderCalendar() {
    const calendar = document.getElementById("calendar");
    const graphic = getGraphic(new Date().getFullYear(), new Date().getMonth(), "16.1-1");
}