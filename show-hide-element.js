
const showElement = (element) => {
    element.classList.remove("hide");

    switch(window.getComputedStyle(element).display) {
        case "block": element.classList.add("show");
            break;
        case "flex": element.classList.add("showFlex");
            break;
        case "table-row": element.classList.add("showRow");
            break;
    }
},

hideElement = (element) => {
    element.classList.remove("show");
    element.classList.remove("showRow");
    element.classList.remove("showFlex");
    element.classList.add("hide");
};

export {showElement, hideElement};