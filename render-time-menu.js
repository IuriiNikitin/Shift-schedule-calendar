import getGraphic from "./get-graphic.js";
import { getMonth, getYear } from "./get-month-get-year.js";
import { showElement, hideElement } from "./show-hide-element.js";
import getTimeInfo from "./get-time-info.js";
import setDaySettings from "./set-day-settings.js";
import calcFinalTime from "./calc-final-time.js";
import convertTimeArr from "./convert-time-arr.js";

export default function renderTimeMenu(num, timeType) {

    const timeMenu = document.querySelector(".time_menu");
    const month = getMonth();
    const year = getYear();
    const day = getGraphic(year, month, graphic.value)[num - 1];

    let breakTimeHtml = "";
    let name = "";

    switch(timeType) {
        case "actual" :
            name = "Отработанное время";
            break;
        case "graphic" :
            name = "Время по графику";
            break;
    }

    day.time[timeType].break.forEach(breakTime => {
        breakTimeHtml += `
            <div class="break">
            <div class="start">
                <div class="small_descr"><small><small>начало</small></small></div>
                <input type="time" value=${breakTime[0]}>
            </div>
            <div class="end">
                <div class="small_descr"><small><small>конец</small></small></div>
                <input type="time" value=${breakTime[1]}>
            </div>
        </div>
        `
    })

    const timeMenuContent = `
    <div class="time_menu_content">
        <div class="time_menu_title">${name}</div>
        <div class="time_menu_data">
            <div class="time_title"><div>Рабочее время</div></div>
            <div class="shift">
                <div class="start">
                    <div class="small_descr"><small><small>начало</small></small></div>
                    <input type="time" value=${day.time[timeType].shift[0]}>
                </div>
                <div class="end">
                    <div class="small_descr"><small><small>конец</small></small></div>
                    <input type="time" value=${day.time[timeType].shift[1]}>
                </div>
            </div>
            <div class="time_title">Время перерыва</div>
                ${breakTimeHtml}

                <div class="time_menu_total_time">Итого : 
                ( ${getTimeInfo(day.finalTime[timeType])} )</div>

                </div>
                <div class="time_menu_btns">
                    <button>Сбросить</button>
                    <button>Отмена</button>
                    <button>Ок</button>
        </div>
    </div>`

    timeMenu.innerHTML = timeMenuContent;
    showElement(timeMenu);

    function getTimeArr() {
        const shiftArr = [];
        const breakArr = [];

        timeMenu.querySelector(".shift").querySelectorAll("input").forEach(item => {
            shiftArr.push(item.value);
        });

        timeMenu.querySelectorAll(".break").forEach((item, i) => {
            breakArr[i] = [];
            item.querySelectorAll("input").forEach(input => {
                breakArr[i].push(input.value);
            });
        });

        return {break:breakArr, shift:shiftArr};
    }

    timeMenu.querySelectorAll("input").forEach(input => {
        input.addEventListener("change", () => {
            const newTime =  getTimeArr();
            const newShiftDates = convertTimeArr(newTime.shift, day.date);
            const newBreakDates = convertTimeArr(newTime.break, day.date);
            const newTotalTime = calcFinalTime(newShiftDates, newBreakDates);
            timeMenu.querySelector(".time_menu_total_time").innerHTML = `
            Итого : ( ${getTimeInfo(newTotalTime)} )`;
        });
    });

    timeMenu.querySelector(".time_menu_btns").querySelectorAll("button")[1].addEventListener("click", () => {
        hideElement(timeMenu);
        timeMenu.innerHTML = "";
    })
}

// renderTimeMenu(5, "actual");