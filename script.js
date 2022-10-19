"use strict";

import renderGraphicValues from "./render_graphic_values.js";
import renderCalendar from "./render-calendar.js";
import { getYear, getMonth } from "./get-month-get-year.js";

const graphic = document.getElementById("graphic");




renderGraphicValues();
renderCalendar(new Date().getFullYear(), new Date().getMonth(), graphic.value);


graphic.addEventListener("change", (e) => {
    renderCalendar(getYear(), getMonth(), e.target.value);
    localStorage.setItem("current_graphic", e.target.value);
});


function updateCalendar() {

    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1,);
    const timeUntilTomorrow = tomorrow - now;

    
    const update = setTimeout(() => {
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        const calendarMonth = getMonth();
        const calendarYear = getYear();

        if(currentMonth === calendarMonth && currentYear === calendarYear) {
            renderCalendar(new Date().getFullYear(),  new Date().getMonth(), graphic.value);
            console.log("Updated!");
        }
        updateCalendar();
    }, timeUntilTomorrow);
}



// window.addEventListener("focus", () => {
//     const calendarCurrentDay = +document.querySelector(".today").querySelector("div").innerHTML;
//     const currentDay = new Date().getDate();

//     console.log(calendarCurrentDay)

// });

updateCalendar();



