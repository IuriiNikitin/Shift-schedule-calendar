import isObject from "./is-object.js";
import isEmpty from "./is-empty.js";
import isSameArr from "./is-same-arr.js";

export default function deleteSameValues(target, source) {

    for(let key in target) {

            if(isObject(source[key]) ){
                deleteSameValues(target[key], source[key]);
                if(isEmpty(target[key])) {delete target[key]};
            } else if(Array.isArray(source[key])) {

                if(Array.isArray(source[key][0])) {
                    for( let i = 0 ; source[key].length > i ; i++ ) {
                        if(isSameArr(source[key][i], target[key][i])) {
                            delete target[key][i];
                        }
                    }
                    target[key] =  target[key].filter(Boolean);
                    if(!target[key].length) {delete target[key]};
                    

                } else {
                    if(isSameArr(source[key], target[key])) { delete target[key]; }
                }

                
            } else {
                if(source[key] === target[key]) { delete target[key]; }

            }
    }

}





// const gr = {
//     9: {
//         actualType: "cal-ndg",
//         descr: "descr",
//         name: "exampl",
//         holiday: true,
//         time: {
//             actual:{
//                 shift:["07:20", "20:00"],
//                 break:[["11:30", "12:10"], ["16:00", "16:18"]],
//             },
//             graphic:{
//                 shift:["07:20" , "20:00"],
//                 break:[["11:30", "12:10"], ["16:00", "16:18"]],
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
//                 shift:["07:20", "20:00"],
//                 break:[["11:30", "12:10"], ["16:00", "16:18"]],
//             },
//             graphic:{
//                 shift:["07:20" , "20:00"],
//                 break:[["11:30", "12:10"], ["16:00", "16:18"]],
//             }
//         }
//     }
// }




// export default function deleteSameValues(target, source) {

//     for(let key in target) {

//         if(isObject(source[key])){
//             deleteSameValues(target[key], source[key]);
//             if(isEmpty(target[key])) { delete target[key] };

//         } else if(Array.isArray(source[key])) {
//             for( let i = 0; source[key].length > i; i++ ) {
//                 if(Array.isArray(source[key][i])) {
//                     if(isSameArr(source[key][i], target[key][i])) { delete target[key][i]; }
//                 } else {
//                     if( JSON.stringify(source[key]) === JSON.stringify(target[key])) { delete target[key]; }
//                 }
//             }
//             if(target[key]) {
//                 target[key] = target[key].filter(Boolean);
//                 if(!target[key].length) {delete target[key]};
//             }
//         } else {
//             if(source[key] === target[key]) { delete target[key]; }
//         }
//     }

// }