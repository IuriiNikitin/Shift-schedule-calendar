export default function setElementHeight(element, coeOfWidth) {

	const widthString = getComputedStyle(element).width;
	const width = +parseFloat(widthString, 10);

	element.setAttribute("height", width * coeOfWidth);

}