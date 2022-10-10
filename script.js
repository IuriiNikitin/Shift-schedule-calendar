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



// const gr = {
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

// const ls = {
//     9: {
//         actualType: "cal-ndg",
//         descr: "descr",
//         name: "exampl",
//         holiday: false,
//         time: {
//             actual:{
//                 shift:["07:20", "19:00"],
//                 break:[["11:30", "12:30"], ["16:00", "16:18"]]
//             },
//             graphic:{
//                 shift:["07:20" , "20:00"],
//                 break:[["11:30", "12:10"], ["16:00", "16:18"]]
//             }
//         }
//     }
// }

// function cleeningLs(target, ...sources) {
//     function isObject(item) {
//       return (item && typeof item === 'object' && !Array.isArray(item));
//     }
  
//       if (!sources.length) return target;
//       const source = sources.shift();
      
//       if (isObject(target) && isObject(source)) {
//         for (const key in source) {
//           if (isObject(source[key])) {
//             if (!target[key]) Object.assign(target, { [key]: {} }); //
//             cleeningLs(target[key], source[key]);
//           } else {
//             Object.assign(target, { [key]: source[key] });
//           }
//         }
//       }
    
//       return cleeningLs(target, ...sources);
//     }

    
// localStorage.setItem("2022:9:16.1-1", JSON.stringify(abc));

// if(localStorage.getItem("2022:8:16.1-1")){
//     console.log("its here!");
// }