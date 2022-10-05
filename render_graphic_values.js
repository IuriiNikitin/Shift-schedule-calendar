export default function renderGraphicValues() {

    const shifts = ["14.1", "14.2", "16.1-1", "16.1-2", "16.2-1", "16.2-2"];

    let values = "";

    shifts.forEach(item => {
        values += `<option value=${item}`;
        if(localStorage.getItem("current_graphic") === item) {values += " selected";}
        values += `>График ${item.split(".")[0]} смена ${item.split(".")[1]}`;
    });
    graphic.innerHTML = values;
}