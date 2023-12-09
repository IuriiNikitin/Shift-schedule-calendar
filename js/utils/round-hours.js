export default function roundHours(value) {
    return (Math.round(value * 100000000000)) / 100000000000;
}