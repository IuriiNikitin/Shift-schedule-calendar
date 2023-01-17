import { getYear, getMonth } from "./get-month-get-year.js";
import mergeDeep from "./deep-merge-objects.js";


export default function setDaySettings(day, settingsObj) {
    const year = getYear();
    const month = getMonth();
    const key = `${year}:${month}:${graphic.value}`;

    if(localStorage.getItem(key)) {
        const currentSettings = JSON.parse(localStorage.getItem(key));
        const newSettings = mergeDeep(currentSettings, {[day]:settingsObj});

        localStorage.setItem(key, JSON.stringify(newSettings));
    } else {
        localStorage.setItem(key, JSON.stringify({[day]:settingsObj}));
    }
}