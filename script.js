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
    name: "Выход",
    worked: false,
};
const morningDay = {
    type: "cal-mdg",
    name: "День",
    worked: true,
    time: 11.7,
};
const nightDay = {
    type: "cal-ndg",
    name: "Ночь",
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

// console.log(graphicD.filter(day => day.type === "mdg").reduce((sum, current) => {return sum + current.time}, 0));
// console.log(graphicD);

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

    document.getElementById(id).innerHTML = `
    <thead>
        <tr>
            <th colspan="2">‹</th>
            <th colspan="3">
                <div>
                    <button>${months[month]}</button>
                    <button>${year}</button>
                </div>
            </th>
            <th colspan="2">›</th>
        </tr>
        <tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th></tr>
    </thead>`;
    

    const days = getGraphic(year, month, graphic);

    let calendar = "<tbody><tr>";

    if(days[0].dayWeek !== 1) { //Добавляем пустые столбцы в начале, если это не понедельник
        for(let i = 1; i < days[0].dayWeek; i++) {
            calendar += "<td>";
        }
    }

    for(let i = 0; i < days.length; i++) {

        let clazz = days[i].type;
        const num = i + 1;
        const name = days[i].name;
        if(days[i].today) {clazz += " today"}

        calendar += `<td class="${clazz}"><div>${num}</div><div>${name}`;

        if(days[i].dayWeek === 7) {calendar += "<tr>"}

    }

    document.getElementById(id).innerHTML += calendar;

    document.getElementById(id).querySelectorAll("th")[0].addEventListener("click", () => {
        renderCalendar(+year, month - 1, graphic);
    });
    document.getElementById(id).querySelectorAll("th")[2].addEventListener("click", () => {
        renderCalendar(+year, month + 1, graphic);
    });
    document.getElementById(id).querySelectorAll("button")[0].addEventListener("click", () => {
        renderMonths();
    });
    document.getElementById(id).querySelectorAll("button")[1].addEventListener("click", () => {
        renderYears(+year);
    });
}

renderCalendar(new Date().getFullYear(), new Date().getMonth(), "16.1-1");

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

    document.getElementById(id).innerHTML = `
    <thead>
        <tr>
            <th>‹</th>
            <th>
                <div>
                    <button>${month}</button>
                    <button>${year}</button>
                </div>
            </th>
            <th>›</th>
        </tr>
    </thead>`;

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
            renderCalendar(e.target.innerText, getMonth(), "16.1-1");
        });
    });

    document.getElementById(id).querySelectorAll("button")[0].addEventListener("click", () => {
        renderMonths();
    });
    document.getElementById(id).querySelectorAll("button")[1].addEventListener("click", () => {
        renderCalendar(getYear(), getMonth(), "16.1-1");
    });
    document.getElementById(id).querySelectorAll("th")[0].addEventListener("click", () => {
        renderYears(+year - 15);
    });
    document.getElementById(id).querySelectorAll("th")[2].addEventListener("click", () => {
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
            renderCalendar(getYear(), num, "16.1-1");
        });
    });

    document.getElementById(id).querySelectorAll("button")[0].addEventListener("click", () => {
        renderCalendar(getYear(), getMonth(), "16.1-1");
    });
    document.getElementById(id).querySelectorAll("button")[1].addEventListener("click", () => {
        renderYears(getYear());
    });
}