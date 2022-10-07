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



// const abc = {
//     9: {
//         actualType: "cal-ndg",
//         descr: "descr",
//         name: "exampl",
//         holiday: true,
//         time: {
//             actual:{
//                 shift:["07:20", "20:00"],
//                 break:[["11:30", "12:20"], ["16:00", "16:18"]]
//             },
//             graphic:{
//                 shift:["07:20" , "20:00"],
//                 break:[["11:30", "12:10"], ["16:00", "16:18"]]
//             }
//         }
//     }
// }

// localStorage.setItem("2022:9:16.1-1", JSON.stringify(abc));

// if(localStorage.getItem("2022;8;16.1-1")){
//     console.log("its here!");
// }