import dayTime from "./day-times-data.js";


const defaultTimeData = {
    morning: {
        actual: {
            shift: dayTime.morning12h.shift,
            break: dayTime.morning12h.break,
        },
        graphic: {
            shift: dayTime.morning12h.shift,
            break: dayTime.morning12h.break,
        },
    },
    night: {
        actual: {
            shift: dayTime.night12h.shift,
            break: dayTime.night12h.break,
        },
        graphic: {
            shift: dayTime.night12h.shift,
            break: dayTime.night12h.break,
        },
    },
}

const dayTypes = [
    {
        actualType:"day-off",
        name:"Выход",
        descr:"Выходной день",
        time: null,
    },
    {
        actualType:"cal-mdg",
        name:"День",
        descr:"Дневная смена",
        time: defaultTimeData.morning,
    },
    {
        actualType:"cal-ndg",
        name:"Ночь",
        descr:"Ночная смена",
        time: defaultTimeData.night,
    },
    {
        actualType:"cal-omd",
        name:"Сверх",
        descr:"Сверхурочная дневная смена",
        time: defaultTimeData.morning,
    },
    {
        actualType:"cal-ond",
        name:"Сверх",
        descr:"Сверхурочная ночная смена",
        time: defaultTimeData.night,
    },
    {
        actualType:"cal-sick",
        name:"Боль",
        descr:"Больничный",
        time: null,
    },
    {
        actualType:"cal-vac",
        name:"Отпуск",
        descr:"Отпуск",
        time: null,
    },
    {
        actualType:"day-off-oex",
        name:"За свой",
        descr:"За свой счёт",
        time: null,
    }
];


export default dayTypes;