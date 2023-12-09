import renderTableHeader from "./render-table-header.js";
import renderMonths from "./render-months.js";
import renderCalendar from "./render-calendar.js";
import renderStatistics from "./render-statistics.js";
import { getYear, getMonth } from "../get-month-get-year.js";


export default function renderYears(year, id = "calendar") {

    if(+year < 2007) {year = 2007}

    renderTableHeader();
    let calendar = "<tbody><tr>";
    const startYear = year - 8;

    for(let i = 1; i <= 15; i++) {
        let clazz = "year";
        if(startYear + i === new Date().getFullYear()) {clazz += " today"};
        if(startYear + i === getYear()) {clazz += " selected_item"};
        calendar += `<td class="${clazz}">${startYear + i}`;
        if(!(i % 3)){calendar += "<tr>"}
    }

    document.getElementById(id).innerHTML += calendar;

    document.getElementById(id).querySelectorAll(".year").forEach((year) => {
        year.addEventListener("click", (e) => {
            renderCalendar(e.target.innerText, getMonth(), graphic.value);
            renderStatistics();
        });
    });

    document.getElementById(id).querySelectorAll("button")[0].addEventListener("click", () => {
        renderMonths();
    });
    document.getElementById(id).querySelectorAll("button")[1].addEventListener("click", () => {
        renderCalendar(getYear(), getMonth(), graphic.value);
    });
    document.getElementById(id).querySelectorAll(".arrow")[0].addEventListener("click", () => {
        renderYears(+year - 1);
    });
    document.getElementById(id).querySelectorAll(".arrow")[1].addEventListener("click", () => {
        renderYears(+year + 1);
    });
}