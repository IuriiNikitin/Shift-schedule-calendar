import findHolidays from "./find-holidays.js";
import findSalary from "./find-salary.js";
import daysPlus from "./utils/days-plus.js";
import graphics from "../data/graphics-data.js";
import updateGraphic from "./update-graphic.js";



export default function getGraphic(year, month, graphic) {

    const graphicD = [];

    const now = new Date(year, month);
    const currentYear = now.getFullYear(); // Текущий год
    const currentMonth = now.getMonth(); // Текущий месяц
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate(); // Последнее число текущего месяца
    const firstDate = new Date(currentYear, currentMonth, 1); // Первая дата месяца
    const lastDate = new Date(currentYear, currentMonth, lastDay); // Последняя дата месяца

    function addDay(date, spread) {
        if (date <= lastDate && date >= firstDate) {
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
    
     function findStartDate(daysInCycle, startDate) {
         const date = new Date(startDate);
         if (date < firstDate) {
             while (date < firstDate) {
                 daysPlus(date, daysInCycle);
             }
         } else {
             while (date > firstDate) {
                 daysPlus(date, -daysInCycle);
             }
         }

         if (date.getDate() !== 1) { // откатываем начало смен на прошлый месяц если это не первое число
             daysPlus(date, -daysInCycle);
         }
         return date;
     }

		 const currGraphic = graphics[graphic];

		 const daysInCycle = currGraphic.pattern.reduce(
			(accumulator, currentValue) => accumulator + currentValue[1], 0,
		);

		const startDate = findStartDate(daysInCycle, currGraphic.startDate);

		while (startDate <= lastDate) {
            for (let i = 0; i < currGraphic.pattern.length; i++) {
                const [day, num] = currGraphic.pattern[i];
                addDays(startDate, day, num);
            }
        }

    const key = `${year}:${month}:${graphic}`;

    updateGraphic(key, graphicD);

    graphicD.forEach(day => { // финальная проверка каждого дня
        if (day.time) { day.calcTime(); }
        if (day.checkHoliday) { day.checkHoliday(); }
    });

    console.log(graphicD);

    return graphicD;
    }

    // getGraphic(new Date().getFullYear(), new Date().getMonth(), "16.1-1");