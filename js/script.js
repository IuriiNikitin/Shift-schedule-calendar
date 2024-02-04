"use strict";

import renderGraphicValues from "./render/render-graphic-values.js";
import renderCalendar from "./render/render-calendar.js";
import renderStatistics from "./render/render-statistics.js";
import { getYear, getMonth } from "./get-month-get-year.js";

import renderSettingsMenu from "./render/render-settings-menu.js";


document.addEventListener("DOMContentLoaded", () => {

    const graphic = document.getElementById("graphic");

    renderGraphicValues();
    renderCalendar(new Date().getFullYear(), new Date().getMonth(), graphic.value);
    renderStatistics();
    
    // renderSettingsMenu();
    
    
    graphic.addEventListener("change", (e) => {
        renderCalendar(getYear(), getMonth(), e.target.value);
        renderStatistics();
        localStorage.setItem("current_graphic", e.target.value);
    });
    
    
    function updateCalendar() {
    
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1,);
        const timeUntilTomorrow = tomorrow - now;
    
        
        setTimeout(() => {
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
  });
