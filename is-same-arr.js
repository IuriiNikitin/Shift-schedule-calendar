export default function isSameArr(arr1, arr2) {

    if(arr1 && arr2) {
        for( let i = 0 ; arr1.length > i ; i++ ) {
            if(JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {return false;}
        }
    } else {
        return false;
    }
    return true;
}