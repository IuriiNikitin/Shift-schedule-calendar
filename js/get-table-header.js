import getMonthsNames from "./utils/get-month-names.js";

export default function getTableHeader(month, year, colspan = [0, 0, 0]) {

    const monthName = getMonthsNames()[month];

    return `<thead>
    <tr>
        <th colspan="${colspan[0]}">
            <button type="button" class="btn btn-light arrow-left">
                <img class="d-block" src="./img/left.svg" alt="left">
            </button>
        </th>
        <th colspan="${colspan[1]}">
            <button class="btn btn-primary btn-sm btn-month" data-monthNum=${month}>${monthName}</button>
            <button class="btn btn-primary btn-sm btn-year">${year}</button>
        </th>
        <th colspan="${colspan[2]}">
            <button type="button" class="btn btn-light arrow-right">
                <img class="d-block" src="./img/right.svg" alt="right">
            </button>
        </th>
    </tr>`;
}