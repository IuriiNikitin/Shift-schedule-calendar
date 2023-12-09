import getTableHeader from "../get-table-header.js";
import { getMonth, getYear } from "../get-month-get-year.js";

export default function renderTableHeader(id = "calendar") {
    
    const month = getMonth();
    const year = getYear();
    const header = getTableHeader(month, year);

    document.getElementById(id).innerHTML = header;
}