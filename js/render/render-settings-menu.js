import { hideElement, showElement } from "../utils/show-hide-element.js"
import { getMonth, getYear } from "../get-month-get-year.js";
import getMonthsNames from "../utils/get-month-names.js"

export default function renderSettingsMenu() {
    
    const settingsMenu = document.querySelector(".month_settings_menu");
    const month = getMonthsNames()[getMonth()];
    const year = getYear();
    let monthBtns = "";

    const monthBtnsData = [
        {
            name:"Установить отпуск",
            id:"set_cal-vac",
        },
        {
            name:"Установить больничный",
            id:"set_cal-sick",
        },
        {
            name:"Сбросить месяц",
            id:"reset_month",
        }
    ];

    monthBtnsData.forEach(btn => {
        monthBtns += `<button id="${btn.id}"`;
        monthBtns += `>${btn.name}</button>`;
    })

    // console.log(monthBtns);
    

    const settingsMenuContent = `
        <div class="month_settings_menu_content">
            <div class="month_settings_menu_title">Настройки</div>
            <div class="month_settings_menu_data">
                <div class="tabs">
                    <input type="radio" name="tab-btn" id="tab-btn-1" checked>
                    <label for="tab-btn-1">${month} ${year}</label>
                    <input type="radio" name="tab-btn" id="tab-btn-2">
                    <label for="tab-btn-2">Общие</label>
                    <div id="content-1">
                        ${monthBtns}
                    </div>
                    <div id="content-2">
                        <button>Сбросить график</button>
                    </div>
                </div>

            </div>

            <div data-close class="month_settings_menu_close">&times;</div>
        </div>`;


    settingsMenu.innerHTML = settingsMenuContent;
    showElement(settingsMenu);

    settingsMenu.querySelector(".month_settings_menu_close").addEventListener("click", () => {
        hideElement(settingsMenu);
        settingsMenu.innerHTML = "";
    })
}