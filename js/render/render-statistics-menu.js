import getStatistics from "../get-statistics.js";
import { getMonth, getYear } from "../get-month-get-year.js";
import getMonthsNames from "../utils/get-month-names.js";

export default function renderStatisticsMenu() {

    const currentMonthName = getMonthsNames()[getMonth()];
    const currentYear = getYear();

    const statisticsData = getStatistics();

		const statisticsModal = document.getElementById('statisticsModal');
		const statisticsModalLabel = document.getElementById('statisticsModalLabel');
		const statisticsModalBody = statisticsModal.querySelector('.modal-body');

    let statisticsTable = `
    <table class="table table-bordered table-sm">
        <thead class="table-light text-center">
            <th>Тип дней</th>
            <th>Дней</th>
            <th>Часов</th>
        </thead>
    <tbody>`;

    statisticsData.forEach(item => {
        if(item.days) {
            statisticsTable += `
            <tr>
                <td >${item.name}</td>
                <td class="text-center">${item.days}</td>
                <td class="text-center">${item.hours}</td>
        </tr>`
        }
    })

		statisticsModalLabel.innerHTML = `${currentMonthName} ${currentYear}`;
		statisticsModalBody.innerHTML = `${statisticsTable}`;
}