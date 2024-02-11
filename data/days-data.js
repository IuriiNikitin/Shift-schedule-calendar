import Day from "../js/Day.js";
import dayTime from "./days-time-data.js";
import colors from "./colors.js";

const days = [
    new Day({
        name: "Выход",
        descr: "Выходной день",
        dayType: "day-off",
        possibleTypes: ["cal-omd", "cal-ond", "cal-sick", "cal-vac"],
    }),
		new Day({
			name: "Выход",
			descr: "Выходной день",
			dayType: "day-off_1",
			possibleTypes: ["cal-mdg_1", "cal-sick", "cal-vac"],
	}),
    new Day({
        name: "День",
        descr: "Дневная смена",
        dayType: "cal-mdg",
        time: dayTime.morning12h,
        possibleTypes: ["cal-ndg", "cal-sick", "cal-vac", "day-off-oex"],
				color: colors.morning,
    }),
		new Day({
			name: "День",
			descr: "Дневная смена",
			dayType: "cal-mdg_1",
			time: dayTime.morning12h_1,
			possibleTypes: ["cal-sick", "cal-vac", "day-off-oex"],
			color: colors.morning,
	}),
    new Day({
        name: "Ночь",
        descr: "Ночная смена",
        dayType: "cal-ndg",
        time: dayTime.night12h,
        possibleTypes: ["cal-mdg", "cal-sick", "cal-vac", "day-off-oex"],
				color: colors.night,
    }),
    new Day({
        name: "День",
        descr: "Дневная смена",
        dayType: "cal-8h-mdg",
        time: dayTime.morning8h,
        possibleTypes: ["cal-sick", "cal-vac", "day-off-oex"],
				color: colors.morning,
    }),
    new Day({
        name: "Выход",
        descr: "Выходной день",
        dayType: "day-off-8h",
        possibleTypes: ["cal-8h-omd", "cal-sick", "cal-vac"],
    }),
    new Day({
        dayType: "cal-omd",
        name: "Сверх",
        descr: "Сверхурочная дневная смена",
        time: dayTime.morning12h,
				color: colors.overtimeMorning,
    }),
    new Day({
        dayType: "cal-ond",
        name: "Сверх",
        descr: "Сверхурочная ночная смена",
        time: dayTime.night12h,
				color:colors.overtimeNight,
    }),
    new Day({
        dayType: "cal-sick",
        name: "Боль",
        descr: "Больничный",
				color: colors.sick,
    }),
    new Day({
        dayType: "cal-vac",
        name: "Отпуск",
        descr: "Отпуск",
				color: colors.vacation,
    }),
    new Day({
        dayType: "day-off-oex",
        name: "За свой",
        descr: "За свой счёт",
    }),
    new Day({
        dayType: "cal-8h-omd",
        name: "Сверх",
        descr: "Сверхурочная дневная смена",
        time: dayTime.morning8h,
				color: colors.overtimeMorning,
    }),
];

export default days;
