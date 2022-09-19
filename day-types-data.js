const dayTypes = [
    {
        actualType:"day-off",
        graphicType:"day-off",
        name:"Выход",
        descr:"Выходной день",
        possibleTypes:["cal-omd", "cal-ond", "cal-sick", "cal-vac"],
    },
    {
        actualType:"cal-mdg",
        graphicType:"cal-mdg",
        name:"День",
        descr:"Дневная смена",
        possibleTypes:["cal-ndg", "cal-sick", "cal-vac", "day-off-oex"],
    },
    {
        actualType:"cal-ndg",
        graphicType:"cal-ndg",
        name:"Ночь",
        descr:"Ночная смена",
        possibleTypes:["cal-mdg", "cal-sick", "cal-vac", "day-off-oex"],
    },
    {
        actualType:"cal-omd",
        name:"Сверх(Д)",
        descr:"Сверхурочная дневная смена",
        possibleTypes:["cal-ond", "day-off", "cal-sick", "cal-vac"],
    },
    {
        actualType:"cal-ond",
        name:"Сверх(Н)",
        descr:"Сверхурочная ночная смена",
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