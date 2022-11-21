import getStatistics from "./get-statistics.js";
import renderStatisticsMenu from "./render-statistics-menu.js";

export default function renderStatistics() {

    const statistics = document.querySelector(".calendar_statistics");

    const data = getStatistics();

    let statisticsInfo = `<div class="statistics_container">`
    
    for(let i = 0; i < 3; i++) {
        statisticsInfo += `
            <div>
                <div>${data[i].name}</div>
                <div>${data[i].days}</div>
            </div>`
    }

statistics.innerHTML = statisticsInfo;

statistics.querySelector(".statistics_container").addEventListener("click", () => {
    renderStatisticsMenu();
});
}