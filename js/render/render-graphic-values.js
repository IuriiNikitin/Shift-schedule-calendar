import graphics from "../../data/graphics-data.js";

export default function renderGraphicValues() {

		let values = "";

		for(let key in graphics) {
			values += `<option value=${key}`;
			if(localStorage.getItem("current_graphic") === key) {values += " selected";}
			values += `>${graphics[key].descr}`
		}
		
    graphic.innerHTML = values;
}