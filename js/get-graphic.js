import dayTypes from "./day-types-data.js";
import findHolidays from "./find-holidays.js";
import findSalary from "./find-salary.js";
import isEmpty from "./is-empty.js";
import deepCopy from "./deep-copy.js"
import calcFinalTime from "./calc-final-time.js";
import daysPlus from "./days-plus.js";
import convertTimeArr from "./convert-time-arr.js";

import mergeDeep from "./deep-merge-objects.js";
import deleteSameValues from "./delete-same-values.js";


export default function getGraphic(year, month, graphic) { //смены 14.1, 14.2, 16.1-1, 16.1-2, 16.2-1, 16.2-2;

    const benchmarkStart = new Date();

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

        case "5/2":
            startDate = new Date("2000/01/03");
            break;
    }

    function calcTime() {

        switch (this.actualType) {
            case "day-off":
            case "cal-sick":
            case "cal-vac":
            case "day-off-oex":
                delete this.time;
                delete this.dates;
                delete this.finalTime;
                return;
        }

        const dates = {};
    
        for (let key in this.time) { // actual graphic
            if (Array.isArray(this.time[key])) {
                dates[key] = convertTimeArr(this.time[key], this.date);
            } else {
                dates[key] = {};
                for (let key1 in this.time[key]) { // break shift
                    dates[key][key1] = convertTimeArr(this.time[key][key1], this.date);
                }
            }
        }

        this.dates = dates;
    
        this.finalTime = {};
        this.finalTime.actual = calcFinalTime(dates.actual.shift, dates.actual.break);
        this.finalTime.graphic = calcFinalTime(dates.graphic.shift, dates.graphic.break);
    }


    function checkHoliday() {
        if(this.holiday && !this.possibleTypes.find(type => type === "day-off")) {
            this.possibleTypes = deepCopy(this.possibleTypes);
            this.possibleTypes.push("day-off");
        }
    }

    class Day {
        constructor(dayType, possibleTypes){
            
            for(let key in dayTypes.find(day => day.actualType === dayType)){
                this[key] = (dayTypes.find(day => day.actualType === dayType))[key];
            }
            this.graphicType = dayType;
            this.note = "";
            this.holiday = false;
            this.possibleTypes = possibleTypes;
            if(dayType !== "day-off") {
                this.calcTime = calcTime;
                this.checkHoliday = checkHoliday;
            }
        }
    }
    const dayOff = new Day("day-off", ["cal-omd", "cal-ond", "cal-sick", "cal-vac"]);
    const morningDay = new Day("cal-mdg", ["cal-ndg", "cal-sick", "cal-vac", "day-off-oex"]);
    const nightDay = new Day("cal-ndg", ["cal-mdg", "cal-sick", "cal-vac", "day-off-oex"]);
    const morning8hDay = new Day("cal-8h-mdg", ["cal-sick", "cal-vac", "day-off-oex"]);
    const dayOff8h = new Day("day-off", ["cal-8h-omd", "cal-sick", "cal-vac"]);

    
    function addDay(date, spread) {
        if (date <= finishDate && date >= firstDate) {
            const day = {
                date:new Date(date),
                dayWeek: [7, 1, 2, 3, 4, 5, 6][new Date(date).getDay()],
                ...spread,
            };
    
            if (day.date.toLocaleDateString() === new Date().toLocaleDateString()) { day.today = true; }
    
            findHolidays(date, (annotation) => {day.holiday = true; day.annotation = annotation;});
            findSalary(date, () => {day.salary = true;});
    
            graphicD.push(day);
        }
    }

    function addDays(date, sprade, num) {
        for(let i = 0; i < num; i++) {
            i > 0 ? addDay(daysPlus(date, 1), sprade) : addDay(date, sprade);
        }
    daysPlus(date, 1);
}
    
     function findStartDate(daysInCycle) {
        for (startDate; startDate < firstDate; daysPlus(startDate, daysInCycle)) {} // Считаем дату начала смен в месяце
    
        if (startDate.getDate() !== 1) { // откатываем начало смен на прошлый месяц если это не первое число 
            daysPlus(startDate, -daysInCycle);
        }
     }
    

    switch(graphic) {
        case "14.1":
        case "14.2":
        
            findStartDate(6);
            
            for (startDate; startDate <= finishDate;) {
                addDays(startDate, morningDay, 3);
                addDays(startDate, dayOff, 3);
            }
            break;

        case "16.1-1":
        case "16.1-2":
        case "16.2-1":
        case "16.2-2":

            findStartDate(12);

            for (startDate; startDate <= finishDate;) {
                addDays(startDate, morningDay, 3);
                addDays(startDate, dayOff, 3);
                addDays(startDate, nightDay, 3);
                addDays(startDate, dayOff, 3);
            }
            break;

        case "5/2" :
            findStartDate(7);
            for (startDate; startDate <= finishDate;) {
                addDays(startDate, morning8hDay, 5);
                addDays(startDate, dayOff8h, 2);
            }
            break;
    }
    

    const key = `${year}:${month}:${graphic}`;

    if(localStorage.getItem(key)) {
    
        const lsData = JSON.parse(localStorage.getItem(key));

        for(let day in lsData) {
            const dayIndex = +day - 1;
            graphicD[dayIndex].time = deepCopy(graphicD[dayIndex].time);

            deleteSameValues(lsData[day], graphicD[dayIndex]);

                if (
                  (lsData[day].actualType === "day-off" &&
                    !lsData[day].holiday &&
                    !graphicD[dayIndex].holiday) ||
                  (lsData[day].actualType === "day-off" &&
                    graphicD[dayIndex].annotation &&
                    graphicD[dayIndex].holiday &&
                    lsData[day].holiday === false)
                ) {
                  delete lsData[day].actualType;
                  delete lsData[day].descr;
                  delete lsData[day].name;
                }

                const actualType = lsData[day].actualType ? lsData[day].actualType : graphicD[dayIndex].actualType;
                const currentTime =  lsData[day].time;
                const defaultTime = dayTypes.find((type) => type.actualType === actualType).time;

                if (lsData[day].time && JSON.stringify(currentTime) !== JSON.stringify(defaultTime)) {

                  lsData[day].timeChanged = [];

                  for (let key in lsData[day].time) {
                    if(JSON.stringify(currentTime[key]) !== JSON.stringify(defaultTime[key])) {
                        lsData[day].timeChanged.push(key);
                    }
                  }
                } else {
                  delete lsData[day].timeChanged;
                }

            isEmpty(lsData[day]) ? delete lsData[day] : graphicD[dayIndex] = mergeDeep(graphicD[dayIndex], lsData[day]);
        }

        isEmpty(lsData) ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(lsData));

    }

    graphicD.forEach(day => { // финальная проверка каждого дня
        if (day.time) { day.calcTime = calcTime; }
        if (day.calcTime) { day.calcTime(); }
        if (day.checkHoliday) { day.checkHoliday(); }
    });



    // console.log(graphicD);
    
    const benchmarkFinish = new Date();

    // console.log(`Сгенерировано за ${benchmarkFinish - benchmarkStart} мс`);

    return graphicD;
    }

    // getGraphic(new Date().getFullYear(), new Date().getMonth(), "16.1-1");