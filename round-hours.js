export default function roundHours(value) {
    value = (Math.round(value * 100000000000)) / 100000000000;
    return value;
}