import holidays from "../data/holidays-list-data.js";

export default function findHolidays(date, func) {

    let number = new Date(date).getDate();
    let month = new Date(date).getMonth() + 1;

    if(month < 10) {month = "0" + month};
    if(number < 10) {number = "0" + number};

    const dateString = number + "." + month;

    holidays.forEach(item => {
        if(typeof(item.date) === "object") {
            if((item.date.findIndex(i => i === dateString)) + 1) {
                func(item.annotation);
            }
        } else if(item.date === dateString) {
            func(item.annotation);
        }
    })
}