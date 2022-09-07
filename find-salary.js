export default function findSalary(date, func) {

    const dayWeek = [7, 1, 2, 3, 4, 5, 6][new Date(date).getDay()];
    const number = new Date(date).getDate();
    const month = new Date(date).getMonth();
    const year = new Date(date).getFullYear();

    if (dayWeek !== 6 && dayWeek !== 7) {
        if (number === 15) { func(); }; // зарплата 15 если это не сб или вс
        if (number === 30 && month !== 11) { func(); }; // аванс 30 если это не сб или вс и не декабрь
    }
    if (month === 1) {
        if (dayWeek === 5) {
            if (number === 26 && year % 4) {func(); }; // в феврале аванс 26 если это пятница и не високосный год
            if (number === 27) { func(); }; // в феврале аванс 27  если это пятница
        }
        if (dayWeek !== 6 && dayWeek !== 7) {
            if (number === 28 && year % 4 ) { func(); }; // в феврале аванс 28  если это не сб или вс и не високосный
            if (number === 29 && !(year % 4) ) {func(); }; // в феврале аванс 29  если это не сб или вс и високосный
        }
    }
    if (month === 11) {
        if (number === 29 && dayWeek !== 6 && dayWeek !== 7) { func(); }; // в декабре аванс 29 если это не сб или вс
        if (number === 27 && dayWeek === 5) {func(); };// если 27 это пт в декабре то аванс в этот день
    }
    if (dayWeek === 5) {
        if (number === 13 || number === 14) {func(); }; // если 13 или 14 это пт то зп в это день
        if (number === 28 || number === 29) { func(); };// если 28 или 29 это пт то аванс в этот день
    }
}
