import convertTimeArr from "./convert-time-arr.js";
import calcFinalTime from "./calc-final-time.js";
import deepCopy from "./utils/deep-copy.js"

class Day {
	constructor({ name, descr, dayType, time, possibleTypes }) {
			this.name = name;
			this.descr = descr;
			this.possibleTypes = possibleTypes;
			this.actualType = dayType;
			this.graphicType = dayType;
			this.note = "";
			this.holiday = false;

			if (time) {
					this.time = {
							actual: time,
							graphic: time,
					};
			} else {
					this.time = null;
			}
			this.toPrimitive = function() {
				delete this.graphicType;
				delete this.possibleTypes;
				delete this.note;
				delete this.holiday;
			}
			this.calcTime = function() {
				
					if (!this.time) {
							delete this.time;
							delete this.dates;
							delete this.finalTime;
							return;
					}
	
					const dates = {};

					for (let key in this.time) {
							// actual graphic
							if (Array.isArray(this.time[key])) {
									dates[key] = convertTimeArr(this.time[key], this.date);
							} else {
									dates[key] = {};
									for (let key1 in this.time[key]) {
											// break shift
											dates[key][key1] = convertTimeArr(
													this.time[key][key1],
													this.date
											);
									}
							}
					}
					this.dates = dates;
	
					this.finalTime = {};
					this.finalTime.actual = calcFinalTime(
							dates.actual.shift,
							dates.actual.break
					);
					this.finalTime.graphic = calcFinalTime(
							dates.graphic.shift,
							dates.graphic.break
					);
			};

			this.checkHoliday = function() {
				if (
					this.holiday &&
					!this.possibleTypes.find((type) => type === "day-off")
			) {
					this.possibleTypes = deepCopy(this.possibleTypes);
					this.possibleTypes.push("day-off");
			}
			}
	}
}

export default Day;