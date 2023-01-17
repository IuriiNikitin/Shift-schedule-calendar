export function getMonth(id = "calendar") {
    const month = document.getElementById(id).querySelectorAll("button")[0].dataset.monthnum;
    return +month;
}

export function getYear(id = "calendar") {
    const year = document.getElementById(id).querySelectorAll("button")[1].innerText;
    return +year;
}