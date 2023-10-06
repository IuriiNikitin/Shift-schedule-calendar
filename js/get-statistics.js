import getGraphic from "./get-graphic.js";
import { getYear, getMonth } from "./get-month-get-year.js";
import roundHours from "./round-hours.js";
import dayTypes from "./day-types-data.js";

export default function getStatistics() {

    const days = getGraphic(getYear(), getMonth(), graphic.value);

    const statisticsArr = [];

    const weekends = days.filter(day => day.actualType === "day-off");
    const workingDays = days.filter(day => day.actualType !== "day-off" && 
    day.actualType !== "cal-sick" && 
    day.actualType !== "cal-vac" &&
    day.actualType !== "day-off-oex");

    const morningDays = days.filter(day => day.actualType === "cal-mdg" || day.actualType === "cal-8h-mdg");
    const nightDays = days.filter(day => day.actualType === "cal-ndg");
    const oMorningDays = days.filter(day => day.actualType === "cal-omd" || day.actualType === "cal-8h-omd");
    const oNightDays = days.filter(day => day.actualType === "cal-ond");
    const vacationDays = days.filter(day => day.actualType === "cal-vac");
    const sickDays = days.filter(day => day.actualType === "cal-sick");


    class StatisticsItem {
        constructor(name, days) {
            this.name = name;
            if(!isNaN(days) && !Array.isArray(days)) {
                this.days = days;
                this.hours = days * 24;
            } else {
                this.days = days.length;
                if(days.find(day => day.finalTime)) {
                    const hours = days.map(day => day.finalTime.actual).reduce((acc, number) => acc + number);
                    this.hours = Math.floor(hours * 100) / 100;
                } else {
                    const hours = days.length * 24;
                    this.hours = days.length ? "~" + hours : hours;
                }
            }
        }
        add(){
            statisticsArr.push(this);
        }
    }

    new StatisticsItem("Календарные дни", days.length).add();
    new StatisticsItem("Рабочие дни", workingDays).add();
    new StatisticsItem("Выходные дни", weekends).add();
    new StatisticsItem("Дневные смены", morningDays).add();
    new StatisticsItem("Ночные смены", nightDays).add();
    new StatisticsItem ("Сверхурочные дневные", oMorningDays).add();
    new StatisticsItem("Сверхурочные ночные", oNightDays).add();
    new StatisticsItem("Отпуск", vacationDays).add();
    new StatisticsItem("Больничный", sickDays).add();



    
    // console.log(statisticsArr);
    return statisticsArr;
}