export function getMonth(id = "calendar") {
    const month = document.getElementById(id).querySelector(".btn-month").dataset.monthnum;
    return +month;
}

export function getYear(id = "calendar") {
    const year = document.getElementById(id).querySelector(".btn-year").innerText;
    return +year;
}