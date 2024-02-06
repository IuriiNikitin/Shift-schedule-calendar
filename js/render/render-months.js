import renderTableHeader from "./render-table-header.js";
import getMonthsNames from "../utils/get-month-names.js";
import renderCalendar from "./render-calendar.js";
import renderYears from "./render-years.js";
import renderStatistics from "./render-statistics.js";
import { getYear, getMonth } from "../get-month-get-year.js";

export default function renderMonths(id = "calendar") {

    renderTableHeader();
    const months = getMonthsNames();
    let calendar = "<tbody><tr>";

    for(let i = 1; i <= 12; i++) {
        let clazz = "month";
        if(i - 1 === new Date().getMonth()) {clazz += " today"};
        if(i - 1 === getMonth()) {clazz += " selected_item"};
        calendar += `<td class="${clazz}">${months[i - 1]}`
        if(!(i % 3)){calendar += "<tr>"}
    }

    document.getElementById(id).innerHTML += calendar;

    document.getElementById(id).querySelectorAll(".month").forEach((month, num) => {
        month.addEventListener("click", () => {
            renderCalendar(getYear(), num, graphic.value);
            renderStatistics();
        });
    });

    document.getElementById(id).querySelector(".btn-month").addEventListener("click", () => {
        renderCalendar(getYear(), getMonth(), graphic.value);
    });
    document.getElementById(id).querySelector(".btn-year").addEventListener("click", () => {
        renderYears(getYear());
    });
}