import daysPlus from "./utils/days-plus.js";

const convertTime = (timeArray, date) =>{

    const start = timeArray[0];
    const end = timeArray[1];
    const startHours = +start.split(":")[0];
    const startMinutes = +start.split(":")[1];
    const endHours = +end.split(":")[0];
    const endMinutes = +end.split(":")[1];

    let startDate = new Date(new Date(date).setHours(startHours,[startMinutes]));
    let endDate = new Date(new Date(date).setHours(endHours,[endMinutes]));

    if(startHours > endHours) { endDate = new Date(daysPlus(endDate, 1));}

    if(startHours < 4) {
        startDate =  new Date(daysPlus(startDate, 1));
        endDate = new Date(daysPlus(endDate, 1));
    }
    return [startDate, endDate];
}

export default function convertTimeArr(timeArrArr, date) {
    let result;

    if (Array.isArray(timeArrArr[0])) {
        result = [];
        timeArrArr.forEach(item => { result.push(convertTime(item, date)); });
    } else { result = convertTime(timeArrArr, date); }

    return result;
}