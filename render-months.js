import renderTableHeader from "./render-table-header.js";
import getMonthsNames from "./get-month-names.js";
import renderCalendar from "./render-calendar.js";
import renderYears from "./render-years.js";
import renderStatistics from "./render_statistics.js";
import { getYear, getMonth } from "./get-month-get-year.js";

export default function renderMonths(id = "calendar") {

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
            renderStatistics();
        });
    });

    document.getElementById(id).querySelectorAll("button")[0].addEventListener("click", () => {
        renderCalendar(getYear(), getMonth(), graphic.value);
    });
    document.getElementById(id).querySelectorAll("button")[1].addEventListener("click", () => {
        renderYears(getYear());
    });
}