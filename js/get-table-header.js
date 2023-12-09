import getMonthsNames from "./utils/get-month-names.js";

export default function getTableHeader(month, year, colspan = [0, 0, 0]) {

    const monthName = getMonthsNames()[month];

    return `<thead>
    <tr>
        <th colspan="${colspan[0]}">
            <div class="arrow_wrapper">
                <img class="arrow" src="./img/left.svg" alt="left">
            </div>
        </th>
        <th colspan="${colspan[1]}">
            <div>
                <button data-monthNum=${month}>${monthName}</button>
                <button>${year}</button>
            </div>
        </th>
        <th colspan="${colspan[2]}">
            <div class="arrow_wrapper">
                <img class="arrow" src="./img/right.svg" alt="right">
            </div>
        </th>
    </tr>`;
}