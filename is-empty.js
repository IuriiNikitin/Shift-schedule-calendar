export default function isEmpty(obj) {
    for (let key in obj) { return false; }
    return true;
}