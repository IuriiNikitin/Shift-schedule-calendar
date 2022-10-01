"use strict";

import findSalary from "./find-salary.js";
import findHolidays from "./find-holidays.js";
import {showElement, hideElement} from "./show-hide-element.js";
import dayTypes from "./day-types-data.js";
import dayTime from "./day-times-data.js";
import roundHours from "./round-hours.js";

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

function calcTime() {

    const convertTime = (timeArray) => {
        const start = timeArray[0];
        const end = timeArray[1];
        const startHours = +start.split(":")[0];
        const startMinutes = +start.split(":")[1];
        const endHours = +end.split(":")[0];
        const endMinutes = +end.split(":")[1];

        let startDate = new Date(new Date(this.date).setHours(startHours,[startMinutes]));
        let endDate = new Date(new Date(this.date).setHours(endHours,[endMinutes]));

        if(startHours > endHours) { endDate = new Date(daysPlus(endDate, 1));}

        if(startHours < 4) {
            startDate =  new Date(daysPlus(startDate, 1));
            endDate = new Date(daysPlus(endDate, 1));
        }
        return [startDate, endDate];
    }
    
    const convertTimeArr = (timeArrArr) => {
        let result;

        if (Array.isArray(timeArrArr[0])) {
            result = [];
            timeArrArr.forEach(item => { result.push(convertTime(item)); });
        } else { result = convertTime(timeArrArr); }
        
        return result;
    }

    const dates = {};

    for (let key in this.time) { // actual graphic
        if (Array.isArray(this.time[key])) {
            dates[key] = convertTimeArr(this.time[key]);
        } else {
            dates[key] = {};
            for (let key1 in this.time[key]) { // break shift
                dates[key][key1] = convertTimeArr(this.time[key][key1]);
            }
        }
    }

    this.dates = dates;

    function calcFinalTime(shiftDatesArr, breakDatesArr) {

        let finalTime = shiftDatesArr[1] - shiftDatesArr[0];

        breakDatesArr.forEach(breakDates => {

        if(breakDates[0] >= shiftDatesArr[0] && breakDates[1] <= shiftDatesArr[1]) {
            finalTime -= breakDates[1] - breakDates[0];
        }
        if(breakDates[0] < shiftDatesArr[0] && breakDates[1] > shiftDatesArr[0]) {
            finalTime -= breakDates[1] - shiftDates[0];
        }
        if(breakDates[0] < shiftDatesArr[1] && breakDates[1] > shiftDatesArr[1]) {
            finalTime -= shiftDates[1] - breakDates[0];
        }
        });

        return (finalTime / 1000) / 60 / 60;
    }

    this.finalTime = {};
    this.finalTime.actual = calcFinalTime(dates.actual.shift, dates.actual.break);
    this.finalTime.graphic = calcFinalTime(dates.graphic.shift, dates.graphic.break);

}

const dayOff = {
    ...dayTypes.find(day => day.actualType === "day-off"),
    note:"",
};

const morningDay = {
    ...dayTypes.find(day => day.actualType === "cal-mdg"),
    time: {
        actual: {
            shift: dayTime.morning12h.shift,
            break: dayTime.morning12h.break,
        },
        graphic: {
            shift: dayTime.morning12h.shift,
            break: dayTime.morning12h.break,
        },
    },
    calcTime:calcTime,
    note:"",
};

const nightDay = {
    ...dayTypes.find(day => day.actualType === "cal-ndg"),
    time: {
        actual: {
            shift: dayTime.night12h.shift,
            break: dayTime.night12h.break,
        },
        graphic: {
            shift: dayTime.night12h.shift,
            break: dayTime.night12h.break,
        },
    },
    calcTime:calcTime,
    note:"",
};

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

        if (day.calcTime) { day.calcTime(); }

        if (day.date.toLocaleDateString() === new Date().toLocaleDateString()) { day.today = true; }

        findHolidays(date, (annotation) => {day.holiday = true; day.annotation = annotation;});
        findSalary(date, () => {day.salary = true;});

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


console.log(graphicD);


if(localStorage.getItem(`${year}:${month}:${graphic}`)) {

    const lsData = JSON.parse(localStorage.getItem(`${year}:${month}:${graphic}`));

    for(let day in lsData) {

        graphicD[+day - 1] = Object.assign(graphicD[+day - 1], lsData[day]);

        if(graphicD[+day - 1].time) {

            graphicD[+day - 1].calcTime = calcTime;
            graphicD[+day - 1].calcTime();
        }
    }

}

return graphicD;
}

// getGraphic(new Date().getFullYear(), new Date().getMonth(), "16.1-1");

function getMonthsNames() {
    return ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
}

function renderCalendar(year, month, graphic, id = "calendar") {

    const months = getMonthsNames();
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

        calendar += `<td class="day ${clazz}"><div>${num}</div><div>${name}</div>`;

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

    document.getElementById(id).querySelectorAll(".day").forEach((day, i) => {
        day.addEventListener("click", () => {
            renderDayMenu(i + 1);
        })
    })

}

renderCalendar(new Date().getFullYear(), new Date().getMonth(), graphic.value);

function getMonth(id = "calendar") {
    const months = getMonthsNames();
    const month = document.getElementById(id).querySelectorAll("button")[0].innerText;
    
    return months.findIndex(i => i === month);
}

function getYear(id = "calendar") {
    const year = document.getElementById(id).querySelectorAll("button")[1].innerText;
    return +year;
}




function renderTableHeader(id = "calendar") {
    
    const months = getMonthsNames();
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
    const months = getMonthsNames();
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


function renderDayMenu(num) {

    const dayMenu = document.querySelector(".day_menu");
    const month = getMonth();
    const year = getYear();
    const day = getGraphic(year, month, graphic.value)[num - 1];
    const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    let graphicTime, workedTime;
    let holidayCheckbox = "<input type='checkbox' ";
    let holidayAnnotation = "";

    let dayTypeOptions = `<option value=${day.actualType} selected>${day.descr}`

    day.possibleTypes.forEach(type => {
       const option = dayTypes.find(day => day.actualType === type);
       dayTypeOptions += `<option value=${type}>${option.descr}`
    });

    function getTimeDiv(timeType) {
        let div;
        if(timeType) {
            div = `
            <div class=${timeType}>
                ${day.time[timeType].shift[0]}-${day.time[timeType].shift[1]} 
                ( ${Math.trunc(day.finalTime[timeType])}ч ${roundHours((day.finalTime[timeType] % 1) * 60)}м |
                ${day.finalTime[timeType]}ч )
            </div>`
        } else {
            div = "<div class='disable'>00:00-00:00 ( 0ч 0м | 0ч )</div>";
        }
        return div;
    }

    if(day.time) {
        graphicTime = getTimeDiv("graphic");
        workedTime = getTimeDiv("actual");
    } else {
        graphicTime = getTimeDiv();
        workedTime = getTimeDiv();
    }

    day.holiday ? holidayCheckbox += "checked>" : holidayCheckbox += ">";

    if(day.annotation) {holidayAnnotation = `<div>${day.annotation}</div>`}

    
    
    const dayMenuContent = `
    <div class="day_menu_content">
    <div class="day_menu_title">
        <div class="day_date">${day.date.toLocaleDateString(undefined, dateOptions)}</div>
    </div>
    <div class="day_menu_data">
        <div class="day_type_wrapper">
            <div><small><small>смена</small></small></div>
            <select name="day_type">
                ${dayTypeOptions}
            </select>
        </div>

        <div class="graphic_time">
            <div><small><small>время по графику</small></small></div>
            ${graphicTime}
        </div>
        <div class="worked_time">
            <div><small><small>отработанное время</small></small></div>
            ${workedTime}
        </div>
        <div class="holiday_checkbox">
            ${holidayCheckbox}
            <div>Праздничный день</div>
        </div>
        ${holidayAnnotation}
        <div class="note">
            <div><small><small>Заметки</small></small></div>
            <textarea>${day.note}</textarea>
        </div>
    </div>

    <div data-close class="day_menu_close">&times;</div>
</div>`

showElement(dayMenu);
dayMenu.innerHTML = dayMenuContent;


dayMenu.querySelector(".day_menu_close").addEventListener("click", () => {
    hideElement(dayMenu);
});
}




renderDayMenu(new Date().getDate());

// const abc = {
//     21: {
//         actualType: "cal-mdg",
//         descr: "descr",
//         name: "exampl",
//         holiday: true,
//         time: {
//             actual:{
//                 shift:["07:20" , "19:00"],
//                 break:[["11:30", "12:10"], ["16:00", "16:18"]]
//             },
//             graphic:{
//                 shift:["07:20" , "20:00"],
//                 break:[["11:30", "12:10"], ["16:00", "16:18"]]
//             }
//         }
//     }
// }

// localStorage.setItem("2022:8:16.1-1", JSON.stringify(abc));

// if(localStorage.getItem("2022;8;16.1-1")){
//     console.log("its here!");
// }