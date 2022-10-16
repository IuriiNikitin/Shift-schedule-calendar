"use strict";

import renderGraphicValues from "./render_graphic_values.js";
import renderCalendar from "./render-calendar.js";
import { getYear, getMonth } from "./get-month-get-year.js";




const graphic = document.getElementById("graphic");




renderGraphicValues();
renderCalendar(new Date().getFullYear(), new Date().getMonth(), graphic.value);


graphic.addEventListener("change", (e) => {
    renderCalendar(getYear(), getMonth(), e.target.value);
    localStorage.setItem("current_graphic", e.target.value);
});


function updateCalendar() {

    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1,);
    const timeUntilTomorrow = tomorrow - now;

    setTimeout(() => {
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        const calendarMonth = getMonth();
        const calendarYear = getYear();

        if(currentMonth === calendarMonth && currentYear === calendarYear) {
            renderCalendar(new Date().getFullYear(),  new Date().getMonth(), graphic.value);
        }
        updateCalendar();
    }, timeUntilTomorrow)

}

updateCalendar();


const gr = {
    9: {
        actualType: "cal-ndg",
        descr: "descr",
        name: "exampl",
        holiday: true,
        time: {
            actual:{
                shift:["07:20", "20:00"],
                break:[["11:30", "12:10"], ["16:00", "16:18"]],
            },
            graphic:{
                shift:["07:20" , "20:00"],
                break:[["11:30", "12:10"], ["16:00", "16:18"]],
            }
        }
    }
}

const ls = {
    9: {
        actualType: "cal-ndg",
        descr: "descr",
        name: "exampl",
        holiday: false,
        time: {
            actual:{
                shift:["07:20", "20:00"],
                break:[["11:30", "12:10"], ["16:00", "16:18"]],
            },
            graphic:{
                shift:["07:20" , "20:00"],
                break:[["11:30", "12:10"], ["16:00", "16:18"]],
            }
        }
    }
}



function isEmpty(obj) {
    for (let key in obj) { return false; }
    return true;
}
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }
function isSameArr(arr1, arr2) {

    for( let i = 0 ; arr1.length > i ; i++ ) {
        if(JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {return false;}
    }
    
    return true;
}


function cleeningLs(lsObj, grObj) {

    for(let key in lsObj) {

            if(isObject(grObj[key]) ){


                cleeningLs(lsObj[key], grObj[key]);
            } else if(Array.isArray(grObj[key])) {



                if(Array.isArray(grObj[key][0])) {
                    for( let i = 0 ; grObj[key].length > i ; i++ ) {
                        if(isSameArr(grObj[key][i], lsObj[key][i])) {
                            delete lsObj[key][i];
                        }
                    }
                    lsObj[key] =  lsObj[key].filter(Boolean);
                    if(!lsObj[key].length) {delete lsObj[key]};
                    

                } else {
                    if(isSameArr(grObj[key], lsObj[key])) {
                        delete lsObj[key];
                    }
                }

                // for(let i = 0; grObj[key].length > i; i++) {
                //     console.log(grObj[key][i])
                //     console.log(lsObj[key][i])
                // }
                
            } else {
                if(grObj[key] === lsObj[key]) {
                    delete lsObj[key];
                }

            }
    }

}

cleeningLs(ls, gr);

console.log(ls);

// console.log(isSameArr(gr["9"].time.actual.break, ls["9"].time.actual.break));



// localStorage.setItem("2022:9:16.1-1", JSON.stringify(abc));

// if(localStorage.getItem("2022:8:16.1-1")){
//     console.log("its here!");
// }