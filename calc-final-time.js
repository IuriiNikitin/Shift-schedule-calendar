export default function calcFinalTime(shiftDatesArr, breakDatesArr) {
    
    let finalTime = shiftDatesArr[1] - shiftDatesArr[0];

    breakDatesArr.forEach(breakDates => {

    if(breakDates[0] >= shiftDatesArr[0] && breakDates[1] <= shiftDatesArr[1]) {
        finalTime -= breakDates[1] - breakDates[0];
    }
    if(breakDates[0] < shiftDatesArr[0] && breakDates[1] > shiftDatesArr[0]) {
        finalTime -= breakDates[1] - shiftDates[0];
    }
    if(breakDates[0] < shiftDatesArr[1] && breakDates[1] > shiftDatesArr[1]) {
        finalTime -= shiftDates[1] - breakDates[0];
    }
    });

    return (finalTime / 1000) / 60 / 60;
}