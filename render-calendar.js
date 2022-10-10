import getGraphic from "./get-graphic.js";
import getTableHeader from "./get-table-header.js";
import renderMonths from "./render-months.js";
import renderYears from "./render-years.js";
import renderDayMenu from "./render-day-menu.js";

export default function renderCalendar(year, month, graphic, id = "calendar") {

    if(month < 0) {month = 11; year -= 1;};
    if(month > 11) {month = 0; year += 1;};

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
        let icons = "<div class='icons'>"
        const num = days[i].date.getDate();
        const name = days[i].name;
        if(days[i].today) {clazz += " today"};
        if(days[i].salary) {icons += "<img src='./img/rouble.svg' alt='rouble'>"};
        if(days[i].holiday) {icons += "<img src='./img/holiday.svg' alt='holiday'>"};
        if(days[i].note) {icons += "<img src='./img/note.svg' alt='note'>"};

        calendar += `<td class="day ${clazz}"><div>${num}</div><div>${name}</div>`;

        if(days[i].salary || days[i].holiday || days[i].note) {calendar += icons}
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