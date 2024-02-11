import getGraphic from "../get-graphic.js";
import days from "../../data/days-data.js";
import renderTimeMenu from "./render-time-menu.js";
import renderCalendar from "./render-calendar.js";
import renderStatistics from "./render-statistics.js";
import { getMonth, getYear } from "../get-month-get-year.js";
import getTimeInfo from "../utils/get-time-info.js";
import { showElement, hideElement } from "../utils/show-hide-element.js";
import setDaySettings from "../set-day-settings.js";
import deepCopy from "../utils/deep-copy.js";

export default function renderDayMenu(num) {

    // const dayMenu = document.querySelector(".day_menu");
		const dayModal = document.getElementById('dayModal');
		const dayModalLabel = document.getElementById('dayModalLabel');
		const dayModalBody = dayModal.querySelector('.modal-body');
    const month = getMonth();
    const year = getYear();
    const day = getGraphic(year, month, graphic.value)[num - 1];
    const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    let graphicTime, workedTime;
    let holidayCheckbox = "<input class='m-1 ms-0' type='checkbox' ";
    let holidayAnnotation = "";


    const graphicTypeDescr =  days.find(type => type.actualType === day.graphicType).descr;

    let dayTypeOptions = `<option value=${day.graphicType}>${graphicTypeDescr}`;





    day.possibleTypes.forEach(type => {
       const option = days.find(day => day.actualType === type);

       dayTypeOptions += `<option value=${type} `;

       if(day.actualType === type) {dayTypeOptions += "selected"};

       dayTypeOptions += `>${option.descr}`;
    });

    function getTimeDiv(timeType) {
      let div;
      if (timeType) {
        div = `
            <div class=${timeType}>
                ${day.time[timeType].shift[0]}-${day.time[timeType].shift[1]} 
                ( ${getTimeInfo(day.finalTime[timeType])} )`;

        if(day.timeChanged && day.timeChanged.find(type => type === timeType)) {
            div += "<img src='./img/clock.svg' alt='clock'>"};
        div += "</div>";
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
        <div class="day_type_wrapper">
            <div class="lh-1"><small><small>смена</small></small></div>
            <select name="day_type">
                ${dayTypeOptions}
            </select>
        </div>
        <div class="graphic_time">
            <div class="lh-1"><small><small>время по графику</small></small></div>
            ${graphicTime}
        </div>
        <div class="actual_time">
            <div class="lh-1"><small><small>отработанное время</small></small></div>
            ${workedTime}
        </div>
        <div class="holiday_checkbox d-flex">
            ${holidayCheckbox}
            <div>Праздничный день</div>
        </div>
        ${holidayAnnotation}
        <div class="note">
            <div class="lh-1"><small><small>Заметки</small></small></div>
            <textarea>${day.note}</textarea>
        </div>
`
dayModalLabel.innerHTML = day.date.toLocaleDateString(undefined, dateOptions);
dayModalBody.innerHTML = dayMenuContent;


// dayMenu.querySelector(".day_menu_close").addEventListener("click", () => {
//     hideElement(dayMenu);
//     dayMenu.innerHTML = "";
// });
// dayMenu.addEventListener("click", (e) => {
//     if(e.target && e.target.matches(".day_menu")) {
//         hideElement(dayMenu);
//         dayMenu.innerHTML = "";
//     }
// })


if(day.time) {
    dayModalBody.querySelector(".actual").addEventListener("click", () => {
        renderTimeMenu(num, "actual");
    });
    dayModalBody.querySelector(".graphic").addEventListener("click", () => {
        renderTimeMenu(num, "graphic");
    });
}
dayModalBody.querySelector(".note").querySelector("textarea").addEventListener("input", (e) => {
    setDaySettings(num, {note:e.target.value});
    renderCalendar(year, month, graphic.value);
});

dayModalBody.querySelector(".holiday_checkbox").querySelector("input[type='checkbox']").addEventListener("change", (e) => {
    setDaySettings(num, {holiday:e.target.checked});
    renderCalendar(year, month, graphic.value);
    renderDayMenu(num);
});
dayModalBody.querySelector("select").addEventListener("change", (e) => {
		const savedSettings = deepCopy(days.find(day => day.actualType === e.target.value));
		savedSettings.toPrimitive();
    setDaySettings(num, savedSettings);
    renderCalendar(year, month, graphic.value);
    renderStatistics();
    renderDayMenu(num);
});

}




// renderDayMenu(new Date().getDate());