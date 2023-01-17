export default function deepCopy(some) {
    return JSON.parse(JSON.stringify(some));
}