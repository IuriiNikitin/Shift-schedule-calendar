import isEmpty from "./utils/is-empty.js";
import deepCopy from "./utils/deep-copy.js"
import days from "../data/days-data.js";
import mergeDeep from "./utils/deep-merge-objects.js";
import deleteSameValues from "./utils/delete-same-values.js";

function updateGraphic(key, graphicD) {

	if(!localStorage.getItem(key)) {return}

	const lsData = JSON.parse(localStorage.getItem(key));

	for(let day in lsData) {

				const dayIndex = +day - 1;

				graphicD[dayIndex].time = deepCopy(graphicD[dayIndex].time || null); // делаем глубокую копию времени

				deleteSameValues(lsData[day], graphicD[dayIndex]); //очищаем LS от дублированных данных


						if (
							(lsData[day].actualType === "day-off" && !lsData[day].holiday && !graphicD[dayIndex].holiday) ||
							(lsData[day].actualType === "day-off" && graphicD[dayIndex].annotation &&
							graphicD[dayIndex].holiday && lsData[day].holiday === false)
						) {
							delete lsData[day].actualType;
							delete lsData[day].descr;
							delete lsData[day].name;
						}

						const actualType = lsData[day].actualType ? lsData[day].actualType : graphicD[dayIndex].actualType;
						const currentTime =  lsData[day].time;
						const defaultDay = days.find((type) => type.actualType === actualType);
						const defaultTime = defaultDay.time;

						if(!defaultTime) {
							delete graphicD[dayIndex].time;
						}

						if (lsData[day].time && JSON.stringify(currentTime) !== JSON.stringify(defaultTime)) {

							lsData[day].timeChanged = [];

							for (let key in lsData[day].time) {
								if(JSON.stringify(currentTime[key]) !== JSON.stringify(defaultTime[key])) {
										lsData[day].timeChanged.push(key);
								}
							}
						} else {
							delete lsData[day].timeChanged;
						}

				isEmpty(lsData[day]) ? delete lsData[day] : graphicD[dayIndex] = mergeDeep(graphicD[dayIndex], lsData[day]);
		}

		isEmpty(lsData) ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(lsData));

}

export default updateGraphic;