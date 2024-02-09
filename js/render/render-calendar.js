import getGraphic from "../get-graphic.js";
import getTableHeader from "../get-table-header.js";
import renderMonths from "./render-months.js";
import renderYears from "./render-years.js";
import renderDayMenu from "./render-day-menu.js";
import renderStatistics from "./render-statistics.js";
import setDaysHeight from "../utils/set-days-height.js";

export default function renderCalendar(year, month, graphic, id = "calendar") {
    
 

    if(month < 0) {month = 11; year -= 1;};
    if(month > 11) {month = 0; year += 1;};

    if(+year < 2000) {return};

    let header = getTableHeader(month, year, [2, 3, 2]);
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
        let iconsTop = "<div class='order-1 d-flex justify-content-between h-17 day__header'><div class='d-flex icons'>";
        let iconsBottom = "<div class='order-3 d-flex h-17 day__footer'>";
        const num = days[i].date.getDate();
        const name = days[i].name;
        if(days[i].today) {clazz += " today"};
        if(days[i].salary) {iconsTop += "<img class='d-block h-100 me-1' src='./img/rouble.svg' alt='rouble'>"};
        if(days[i].holiday) {iconsTop += "<img class='d-block h-100 me-1' src='./img/holiday.svg' alt='holiday'>"};
        if(days[i].note) {iconsBottom += "<img class='d-block h-100 me-1' src='./img/note.svg' alt='note'>"};
        if(days[i].timeChanged) {iconsBottom += "<img class='d-block h-100 me-1' src='./img/clock.svg' alt='clock'>"};

        calendar += `<td class="border p-1 p-sm-2 day ${clazz}">
												<div class="d-flex flex-column justify-content-between h-100">
													<div class="order-2">${name}</div>
												
												`;

        calendar += iconsTop + `</div><div class="lh-1">${num}</div></div>`;
        calendar += iconsBottom;
        
        if(days[i].dayWeek === 7) {calendar += "<tr>"}

    }

    document.getElementById(id).innerHTML += calendar;
		setDaysHeight();

    document.getElementById(id).querySelector(".arrow-left").addEventListener("click", () => {
        renderCalendar(+year, month - 1, graphic);
        renderStatistics();

    });
    document.getElementById(id).querySelector(".arrow-right").addEventListener("click", () => {
        renderCalendar(+year, month + 1, graphic);
        renderStatistics();
    });
    document.getElementById(id).querySelector(".btn-month").addEventListener("click", () => {
        renderMonths();
    });
    document.getElementById(id).querySelector(".btn-year").addEventListener("click", () => {
        renderYears(+year);
    });

    document.getElementById(id).querySelectorAll(".day").forEach((day, i) => {
        day.addEventListener("click", () => {
            renderDayMenu(i + 1);
        })
    })

}