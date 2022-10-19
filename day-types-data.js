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
        possibleTypes:["cal-omd", "cal-ond", "cal-sick", "cal-vac"],
    },
    {
        actualType:"cal-mdg",
        name:"День",
        descr:"Дневная смена",
        time: defaultTimeData.morning,
        possibleTypes:["cal-ndg", "cal-sick", "cal-vac", "day-off-oex"],
    },
    {
        actualType:"cal-ndg",
        name:"Ночь",
        descr:"Ночная смена",
        time: defaultTimeData.night,
        possibleTypes:["cal-mdg", "cal-sick", "cal-vac", "day-off-oex"],
    },
    {
        actualType:"cal-omd",
        name:"Сверх(Д)",
        descr:"Сверхурочная дневная смена",
        time: defaultTimeData.morning,
        possibleTypes:["cal-ond", "day-off", "cal-sick", "cal-vac"],
    },
    {
        actualType:"cal-ond",
        name:"Сверх(Н)",
        descr:"Сверхурочная ночная смена",
        time: defaultTimeData.night,
        possibleTypes:["cal-omd", "day-off", "cal-sick", "cal-vac"],
    },
    {
        actualType:"cal-sick",
        name:"Боль",
        descr:"Больничный",
        // possibleTypes:this.graphicType,
    },
    {
        actualType:"cal-vac",
        name:"Отпуск",
        descr:"Отпуск",
        // possibleTypes:[this.graphicType],
    },
    {
        actualType:"day-off-oex",
        name:"За свой",
        descr:"За свой счёт",
        // possibleTypes:[this.graphicType],
    }
];


export default dayTypes;