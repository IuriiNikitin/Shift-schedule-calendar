//max incomes
let maxIncomes = {
    '01.01.2009':'415000',
    '01.01.2010':'415000',
    '01.01.2011':'463000',
    '01.01.2012':'512000',
    '01.01.2013':'568000',
    '01.01.2014':'624000',
    '01.01.2015':'670000',
    '01.01.2016':'718000',
    '01.01.2017':'755000',
    '01.01.2018':'815000',
    '01.01.2019':'865000',
    '01.01.2020':'912000',
    '01.01.2021':'966000',
    '01.01.2022':'1032000'
};

function getMaxIncomes() {
    
    getElement("https://portal.fss.ru/fss/sicklist/guest","script", function(element) {

        const maxIncomesObj = {};
        let scriptIndex;

        for(let i = 0; i < element.length; i++) {
            if(element[i].innerHTML.includes("maxIncomes = ")) { //находим номер скрипта с нужным значением
               scriptIndex = i;
            }
        }

        const maxIncomesPosition = element[scriptIndex].innerHTML.indexOf("maxIncomes = ");
        const maxIncomesString = element[scriptIndex].innerHTML.slice(maxIncomesPosition + "maxIncomes = ".length);
        const maxIncomesArray = maxIncomesString.match(/'\d{2}\.\d{2}\.\d{4}':'\d{5,}'/igm);



        maxIncomesArray.forEach(element => {
            element = element.split(":");
            const date = element[0].slice(1,-1);
            const money = element[1].slice(1, -1);
            maxIncomesObj[date] = money;
        });

        console.log(maxIncomesObj);
        // return maxIncomesObj;
    });
}

// https://api.allorigins.win/get?url=
// http://alloworigin.com/get?url=

function getElement(url, selector, func) {
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
    .then(response => {
      if (response.ok) {return response.text();}
      throw new Error('Network response was not ok.');
    })
    .then(data => {
        // console.log(data);
        data =  data.replace(/src=/gmi, ""); //убираем лишние ссылки
        const html = document.createElement("div");
        html.innerHTML = data;
        func(html.querySelectorAll(selector));
        });
}