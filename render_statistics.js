import getGraphic from "./get-graphic.js";
import { getYear, getMonth } from "./get-month-get-year.js";

export default function renderStatistics() {
    const statistics = document.querySelector(".calendar_statistics");
    const days = getGraphic(getYear(), getMonth(), graphic.value);

    const calendarDays = days.length;
    const weekends = days.filter(day => day.actualType === "day-off").length;
    const workedDays = days.filter(day => day.actualType !== "day-off" && 
    day.actualType !== "cal-sick" && 
    day.actualType !== "cal-vac" &&
    day.actualType !== "day-off-oex").length;
    
    const statisticsInfo = `
    <div class="statistics_container">
        <div>
            <div>Календарные дни</div>
            <div>${calendarDays}</div>
        </div>
        <div>
            <div>Рабочие дни</div>
            <div>${workedDays}</div>
        </div>
        <div>
            <div>Выходные дни</div>
            <div>${weekends}</div>
        </div>
</div>`
statistics.innerHTML = statisticsInfo;
}