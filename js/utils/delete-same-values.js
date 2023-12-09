import isObject from "./is-object.js";
import isEmpty from "./is-empty.js";
import isSameArr from "./is-same-arr.js";

export default function deleteSameValues(target, source) {


    for(let key in target) {

            if(isObject(source[key]) ){
                deleteSameValues(target[key], source[key]);
                if(isEmpty(target[key])) {delete target[key]};

            } else if(Array.isArray(source[key])) {

                if(isSameArr(source[key], target[key])) { delete target[key]; }

                // if(Array.isArray(source[key][0])) {
                //     for( let i = 0 ; source[key].length > i ; i++ ) {
                //         if(isSameArr(source[key][i], target[key][i])) {
                //             delete target[key][i];
                //         }
                //     }
                //     target[key] =  target[key].filter(Boolean);
                //     if(!target[key].length) {delete target[key]};
                    

                // } else {
                //     if(isSameArr(source[key], target[key])) { delete target[key]; }
                // }

                
            } else {
                if(source[key] === target[key]) { delete target[key]; }

            }
    }

}