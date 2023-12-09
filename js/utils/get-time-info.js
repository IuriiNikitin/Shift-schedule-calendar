import roundHours from "./round-hours.js"

export default function getTimeInfo(decimalTime) {

    const fraction = decimalTime % 1;
    const hours = Math.trunc(decimalTime);
    const minutes = roundHours((fraction) * 60);

    const fractionLength = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );
    const k = () => ( (fractionLength(roundHours(fraction)) > 1) ? (2) : (1));


    return `${hours}ч ${minutes}м | ${decimalTime.toFixed(k())}ч `
}