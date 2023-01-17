import getStatistics from "./get-statistics.js";
import { getMonth, getYear } from "./get-month-get-year.js";
import getMonthsNames from "./get-month-names.js";
import { showElement, hideElement } from "./show-hide-element.js";

export default function renderStatisticsMenu() {

    const currentMonthName = getMonthsNames()[getMonth()];
    const currentYear = getYear();

    const statisticsData = getStatistics();
    const statisticsMenu = document.querySelector(".statistics_menu");
    let statisticsTable = `
    <table>
        <thead>
            <th>Тип дней</th>
            <th>Дней</th>
            <th>Часов</th>
        </thead>
    <tbody>`;

    statisticsData.forEach(item => {
        if(item.days) {
            statisticsTable += `
            <tr>
                <td>${item.name}</td>
                <td>${item.days}</td>
                <td>${item.hours}</td>
        </tr>`
        }
    })


    let statisticsContent = `
    <div class="statistics_menu_content">
    <div class="statistics_menu_title">${currentMonthName} ${currentYear}</div>
    <div class="statistics_menu_data">
    ${statisticsTable}
    </div>
    <div data-close="" class="statistics_menu_close">×</div>
</div>
`

statisticsMenu.innerHTML = statisticsContent;
showElement(statisticsMenu);

statisticsMenu.querySelector(".statistics_menu_close").addEventListener("click", () => {
    hideElement(statisticsMenu);
    statisticsMenu.innerHTML = "";
});
}