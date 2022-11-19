import getGraphic from "./get-graphic.js";
import { getYear, getMonth } from "./get-month-get-year.js";

export default function getStatistics() {

    const days = getGraphic(getYear(), getMonth(), graphic.value);

    const statisticsArr = [

    ];

    const weekends = days.filter(day => day.actualType === "day-off");
    const workingDays = days.filter(day => day.actualType !== "day-off" && 
    day.actualType !== "cal-sick" && 
    day.actualType !== "cal-vac" &&
    day.actualType !== "day-off-oex");

    const morningDays = days.filter(day => day.actualType === "cal-mdg" || day.actualType === "cal-8h-mdg");
    const nightDays = days.filter(day => day.actualType === "cal-ndg");

    statisticsArr.push({
        name:"Календарные дни",
        days:days.length,
        time:days.length * 24,
    })
    
    console.log(statisticsArr);
}