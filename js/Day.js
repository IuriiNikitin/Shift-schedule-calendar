import convertTimeArr from "./convert-time-arr.js";
import calcFinalTime from "./calc-final-time.js";
import deepCopy from "./utils/deep-copy.js"

class Day {
	constructor({ name, descr, dayType, time, possibleTypes, color }) {
			this.name = name;
			this.descr = descr;
			this.possibleTypes = possibleTypes;
			this.actualType = dayType;
			this.graphicType = dayType;
			this.note = "";
			this.holiday = false;

			if(color) {
				this.color = color;
			}

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
				const isDayOff = this.graphicType !== "day-off" && this.graphicType !== "day-off-8h"
				const isPossibleDayOff = this.possibleTypes.find((type) => type === "day-off") &&
				this.possibleTypes.find((type) => type === "day-off-8h");

				if (this.holiday && !isPossibleDayOff && isDayOff) {
					this.possibleTypes = deepCopy(this.possibleTypes);
					this.possibleTypes.push("day-off");
			}
			}
	}
}

export default Day;