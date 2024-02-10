import getStatistics from "../get-statistics.js";
import renderStatisticsMenu from "./render-statistics-menu.js";

export default function renderStatistics() {

    const statistics = document.querySelector(".calendar_statistics");
		const statisticsModal = document.getElementById('statisticsModal');

    const data = getStatistics();

    let statisticsInfo = `<div class="statistics_container w-75 mx-auto">`
    
    for(let i = 0; i < 3; i++) {
        statisticsInfo += `
            <div class="d-flex justify-content-between">
                <div>${data[i].name}</div>
                <div>${data[i].days}</div>
            </div>`
    }

statistics.innerHTML = statisticsInfo;

statisticsModal.addEventListener('shown.bs.modal', () => {
	renderStatisticsMenu();
});
}