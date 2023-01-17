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
    morning8h: {
        actual: {
            shift: dayTime.morning8h.shift,
            break: dayTime.morning8h.break,
        },
        graphic: {
            shift: dayTime.morning8h.shift,
            break: dayTime.morning8h.break,
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
    },
    {
        actualType:"cal-8h-mdg",
        name:"День",
        descr:"Дневная смена",
        time: defaultTimeData.morning8h,
    },
    {
        actualType:"cal-8h-omd",
        name:"Сверх",
        descr:"Сверхурочная дневная смена",
        time: defaultTimeData.morning8h,
    },
];


export default dayTypes;