"use strict";

import holidays from "./holidays.js";

const graphic = document.getElementById("graphic");



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
    actualType: "day-off",
    graphicType:"day-off",
    name: "Выход",
    descr: "Выходной день",
};
const morningDay = {
    actualType: "cal-mdg",
    graphicType:"cal-mdg",
    name: "День",
    descr: "Дневная смена",
    worked: true,
    shiftTime:["07:20", "20:00"],
    breakTime: [["11:30", "12:10"], ["16:00", "16:18"]],
};

const nightDay = {
    actualType: "cal-ndg",
    graphicType:"cal-ndg",
    name: "Ночь",
    descr: "Ночная смена",
    worked: true,
    shiftTime:["20:00", "07:30"],
    breakTime: ["00:00", "00:30"],
};

function findHolidays(number, month, func) {
    month += 1;
    if(month < 10) {month = "0" + month};
    if(number < 10) {number = "0" + number};
    const date = number + "." + month;

    holidays.forEach(item => {
        if(typeof(item.date) === "object") {
            if((item.date.findIndex(i => i === date)) + 1) {
                func(item.annotation);
            }
        } else if(item.date === date) {
            func(item.annotation);
        }
    })
}


function daysPlus(date, days) {
    return date.setDate(date.getDate() + days);
}

function addDay(date, spread) {
    if (date <= finishDate && date >= firstDate) {
        const day = {

            date:new Date(date),
            dayWeek: [7, 1, 2, 3, 4, 5, 6][new Date(date).getDay()],

            ...spread,
        };



// console.log(new Date(new Date(date).setHours(20,[17])));


        const {dayWeek} = day;
        const number = day.date.getDate();
        const month = day.date.getMonth();
        const year = day.date.getFullYear();

        if (day.date.toLocaleDateString() === new Date().toLocaleDateString()) { day.today = true; }

        findHolidays(number, month, (annotation) => {
            day.holiday = true;
            day.annotation = annotation;
        });

        if (dayWeek !== 6 && dayWeek !== 7) {
            if (number === 15) { day.salary = true; }; // зарплата 15 если это не сб или вс
            if (number === 30 && month !== 11) { day.salary = true; }; // аванс 30 если это не сб или вс и не декабрь
        }
        if (month === 1) {
            if (dayWeek === 5) {
                if (number === 26 && year % 4) { day.salary = true; }; // в феврале аванс 26 если это пятница и не високосный год
                if (number === 27) { day.salary = true; }; // в феврале аванс 27  если это пятница
            }
            if (dayWeek !== 6 && dayWeek !== 7) {
                if (number === 28 && year % 4 ) { day.salary = true; }; // в феврале аванс 28  если это не сб или вс и не високосный
                if (number === 29 && !(year % 4) ) { day.salary = true; }; // в феврале аванс 29  если это не сб или вс и високосный
            }
        }
        if (month === 11) {
            if (number === 29 && dayWeek !== 6 && dayWeek !== 7) { day.salary = true; }; // в декабре аванс 29 если это не сб или вс
            if (number === 27 && dayWeek === 5) { day.salary = true; };// если 27 это пт в декабре то аванс в этот день
        }
        if (dayWeek === 5) {
            if (number === 13 || number === 14) { day.salary = true; }; // если 13 или 14 это пт то зп в это день
            if (number === 28 || number === 29) { day.salary = true; };// если 28 или 29 это пт то аванс в этот день
        }

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

// console.log(graphicD.filter(day => day.actualType === "mdg").reduce((sum, current) => {return sum + current.time}, 0));
console.log(graphicD);

return graphicD;
}

// getGraphic(new Date().getFullYear(), new Date().getMonth(), "16.1-1");

function getMonths() {
    return ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
}

function renderCalendar(year, month, graphic, id = "calendar") {

    const months = getMonths();
    if(month < 0) {month = 11; year -= 1;};
    if(month > 11) {month = 0; year += 1;};

    let header = getTableHeader(months[month], year, [2, 3, 2]);
    header += "<tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th></tr>";


    document.getElementById(id).innerHTML = header;
    

    const days = getGraphic(year, month, graphic);

    let calendar = "<tbody><tr>";

    if(days[0].dayWeek !== 1) { //Добавляем пустые столбцы в начале, если это не понедельник
        for(let i = 1; i < days[0].dayWeek; i++) {
            calendar += "<td>";
        }
    }

    for(let i = 0; i < days.length; i++) {

        let clazz = days[i].actualType;
        let icons = "<div class='icons'>"
        const num = days[i].date.getDate();
        const name = days[i].name;
        if(days[i].today) {clazz += " today"};
        if(days[i].salary) {icons += "<img src='./img/rouble.svg' alt='rouble'>"};
        if(days[i].holiday) {icons += "<img src='./img/holiday.svg' alt='holiday'>"};

        calendar += `<td class="${clazz}"><div>${num}</div><div>${name}</div>`;

        if(days[i].salary || days[i].holiday) {calendar += icons}
        if(days[i].dayWeek === 7) {calendar += "<tr>"}

    }

    document.getElementById(id).innerHTML += calendar;

    document.getElementById(id).querySelectorAll(".arrow")[0].addEventListener("click", () => {
        renderCalendar(+year, month - 1, graphic);
    });
    document.getElementById(id).querySelectorAll(".arrow")[1].addEventListener("click", () => {
        renderCalendar(+year, month + 1, graphic);
    });
    document.getElementById(id).querySelectorAll("button")[0].addEventListener("click", () => {
        renderMonths();
    });
    document.getElementById(id).querySelectorAll("button")[1].addEventListener("click", () => {
        renderYears(+year);
    });
}

renderCalendar(new Date().getFullYear(), new Date().getMonth(), graphic.value);

function getMonth(id = "calendar") {
    const months = getMonths();
    const month = document.getElementById(id).querySelectorAll("button")[0].innerText;
    
    return months.findIndex(i => i === month);
}

function getYear(id = "calendar") {
    const year = document.getElementById(id).querySelectorAll("button")[1].innerText;
    return +year;
}




function renderTableHeader(id = "calendar") {
    
    const months = getMonths();
    const month = months[getMonth()];
    const year = getYear();
    const header = getTableHeader(month, year);

    document.getElementById(id).innerHTML = header;
}

function getTableHeader(month, year, colspan = [0, 0, 0]) {
    return `<thead>
    <tr>
        <th colspan="${colspan[0]}">
            <div class="arrow_wrapper">
                <img class="arrow" src="./img/left.svg" alt="left">
            </div>
        </th>
        <th colspan="${colspan[1]}">
            <div>
                <button>${month}</button>
                <button>${year}</button>
            </div>
        </th>
        <th colspan="${colspan[2]}">
            <div class="arrow_wrapper">
                <img class="arrow" src="./img/right.svg" alt="right">
            </div>
        </th>
    </tr>`;
}




function renderYears(year, id = "calendar") {
    
    renderTableHeader();
    let calendar = "<tbody><tr>";
    const startYear = year - 8;

    for(let i = 1; i <= 15; i++) {
        calendar += `<td class="year">${startYear + i}`
        if(!(i % 3)){calendar += "<tr>"}
    }

    document.getElementById(id).innerHTML += calendar;

    document.getElementById(id).querySelectorAll(".year").forEach((year) => {
        year.addEventListener("click", (e) => {
            renderCalendar(e.target.innerText, getMonth(), graphic.value);
        });
    });

    document.getElementById(id).querySelectorAll("button")[0].addEventListener("click", () => {
        renderMonths();
    });
    document.getElementById(id).querySelectorAll("button")[1].addEventListener("click", () => {
        renderCalendar(getYear(), getMonth(), graphic.value);
    });
    document.getElementById(id).querySelectorAll(".arrow")[0].addEventListener("click", () => {
        renderYears(+year - 15);
    });
    document.getElementById(id).querySelectorAll(".arrow")[1].addEventListener("click", () => {
        renderYears(+year + 15);
    });
}

function renderMonths(id = "calendar") {

    renderTableHeader();
    const months = getMonths();
    let calendar = "<tbody><tr>";

    for(let i = 1; i <= 12; i++) {
        calendar += `<td class="month">${months[i - 1]}`
        if(!(i % 3)){calendar += "<tr>"}
    }

    document.getElementById(id).innerHTML += calendar;

    document.getElementById(id).querySelectorAll(".month").forEach((month, num) => {
        month.addEventListener("click", () => {
            renderCalendar(getYear(), num, graphic.value);
        });
    });

    document.getElementById(id).querySelectorAll("button")[0].addEventListener("click", () => {
        renderCalendar(getYear(), getMonth(), graphic.value);
    });
    document.getElementById(id).querySelectorAll("button")[1].addEventListener("click", () => {
        renderYears(getYear());
    });
}

graphic.addEventListener("change", (e) => {
    renderCalendar(getYear(), getMonth(), e.target.value);
});