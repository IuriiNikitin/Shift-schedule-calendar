export default function deepCopy(some) {
    const copy = JSON.parse(JSON.stringify(some));
    for (let key in some) {
        if (typeof some[key] === "function") {
            copy[key] = some[key];
        }
    }
    return copy;
}
