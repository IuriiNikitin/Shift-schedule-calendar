import getGraphic from "./get-graphic.js";
import dayTypes from "./day-types-data.js";
import renderTimeMenu from "./render-time-menu.js";
import renderCalendar from "./render-calendar.js";
import { getMonth, getYear } from "./get-month-get-year.js";
import getTimeInfo from "./get-time-info.js";
import { showElement, hideElement } from "./show-hide-element.js";
import setDaySettings from "./set-day-settings.js";

export default function renderDayMenu(num) {

    const dayMenu = document.querySelector(".day_menu");
    const month = getMonth();
    const year = getYear();
    const day = getGraphic(year, month, graphic.value)[num - 1];
    const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    let graphicTime, workedTime;
    let holidayCheckbox = "<input type='checkbox' ";
    let holidayAnnotation = "";

    let dayTypeOptions = `<option value=${day.actualType} selected>${day.descr}`

    day.possibleTypes.forEach(type => {
       const option = dayTypes.find(day => day.actualType === type);
       dayTypeOptions += `<option value=${type}>${option.descr}`
    });

    function getTimeDiv(timeType) {
        let div;
        if(timeType) {
            div = `
            <div class=${timeType}>
                ${day.time[timeType].shift[0]}-${day.time[timeType].shift[1]} 
                ( ${getTimeInfo(day.finalTime[timeType])} )
            </div>`
        } else {
            div = "<div class='disable'>00:00-00:00 ( 0ч 0м | 0ч )</div>";
        }
        return div;
    }

    if(day.time) {
        graphicTime = getTimeDiv("graphic");
        workedTime = getTimeDiv("actual");
    } else {
        graphicTime = getTimeDiv();
        workedTime = getTimeDiv();
    }

    day.holiday ? holidayCheckbox += "checked>" : holidayCheckbox += ">";

    if(day.annotation) {holidayAnnotation = `<div>${day.annotation}</div>`}

    
    
    const dayMenuContent = `
    <div class="day_menu_content">
    <div class="day_menu_title">
        <div class="day_date">${day.date.toLocaleDateString(undefined, dateOptions)}</div>
    </div>
    <div class="day_menu_data">
        <div class="day_type_wrapper">
            <div><small><small>смена</small></small></div>
            <select name="day_type">
                ${dayTypeOptions}
            </select>
        </div>

        <div class="graphic_time">
            <div><small><small>время по графику</small></small></div>
            ${graphicTime}
        </div>
        <div class="actual_time">
            <div><small><small>отработанное время</small></small></div>
            ${workedTime}
        </div>
        <div class="holiday_checkbox">
            ${holidayCheckbox}
            <div>Праздничный день</div>
        </div>
        ${holidayAnnotation}
        <div class="note">
            <div><small><small>Заметки</small></small></div>
            <textarea>${day.note}</textarea>
        </div>
    </div>

    <div data-close class="day_menu_close">&times;</div>
</div>`

dayMenu.innerHTML = dayMenuContent;
showElement(dayMenu);


dayMenu.querySelector(".day_menu_close").addEventListener("click", () => {
    hideElement(dayMenu);
    dayMenu.innerHTML = "";
});

if(day.time) {
    dayMenu.querySelector(".actual").addEventListener("click", () => {
        renderTimeMenu(num, "actual");
    });
    dayMenu.querySelector(".graphic").addEventListener("click", () => {
        renderTimeMenu(num, "graphic");
    });
}
dayMenu.querySelector(".note").querySelector("textarea").addEventListener("input", (e) => {
    setDaySettings(num, {note:e.target.value});
    renderCalendar(year, month, graphic.value);
});

dayMenu.querySelector(".holiday_checkbox").querySelector("input[type='checkbox']").addEventListener("change", (e) => {
    setDaySettings(num, {holiday:e.target.checked});
    renderCalendar(year, month, graphic.value);
});
dayMenu.querySelector("select").addEventListener("change", (e) => {
    setDaySettings(num, dayTypes.find(day => day.actualType === e.target.value));
    renderCalendar(year, month, graphic.value);
    renderDayMenu(num);
});

}




// renderDayMenu(new Date().getDate());