import renderTableHeader from "./render-table-header.js";
import renderMonths from "./render-months.js";
import renderCalendar from "./render-calendar.js";
import { getYear, getMonth } from "./get-month-get-year.js";


export default function renderYears(year, id = "calendar") {
    
    renderTableHeader();
    let calendar = "<tbody><tr>";
    const startYear = year - 8;

    for(let i = 1; i <= 15; i++) {
        calendar += `<td class="year">${startYear + i}`
        if(!(i % 3)){calendar += "<tr>"}
    }

    document.getElementById(id).innerHTML += calendar;

    document.getElementById(id).querySelectorAll(".year").forEach((year) => {
        year.addEventListener("click", (e) => {
            renderCalendar(e.target.innerText, getMonth(), graphic.value);
        });
    });

    document.getElementById(id).querySelectorAll("button")[0].addEventListener("click", () => {
        renderMonths();
    });
    document.getElementById(id).querySelectorAll("button")[1].addEventListener("click", () => {
        renderCalendar(getYear(), getMonth(), graphic.value);
    });
    document.getElementById(id).querySelectorAll(".arrow")[0].addEventListener("click", () => {
        renderYears(+year - 15);
    });
    document.getElementById(id).querySelectorAll(".arrow")[1].addEventListener("click", () => {
        renderYears(+year + 15);
    });
}