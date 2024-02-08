import setElementHeight from "./set-element-height.js";

export default function setDaysHeight() {
	document.querySelectorAll(".day").forEach(item => {
		setElementHeight(item, 1.3);
	});
};