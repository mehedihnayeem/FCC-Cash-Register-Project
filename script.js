let price = 19.5;
let cid = [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
];

let currencyValue = [
    ["ONEHUNDRED", 100],
    ["TWENTY", 20],
    ["TEN", 10],
    ["FIVE", 5],
    ["ONE", 1],
    ["QUARTER", 0.25],
    ["DIME", 0.1],
    ["NICKEL", 0.05],
    ["PENNY", 0.01],
];




const priceTotal = document.querySelector(".priceTotal")
const noChangeMessage = document.querySelector(".noChangeMessage")

const cash = document.getElementById("cash")
const purchaseBtn = document.getElementById("purchase-btn")



// change-due
const statusValue = document.querySelector(".statusValue")
const changeDue = document.querySelector("#change-due")


// in drawer
const penniesInDreawer = document.querySelector(".penniesInDreawer")
const nickelsInDreawer = document.querySelector(".nickelsInDreawer")
const dimesInDreawer = document.querySelector(".dimesInDreawer")
const quartersInDreawer = document.querySelector(".quartersInDreawer")
const onesInDreawer = document.querySelector(".onesInDreawer")
const fivesInDreawer = document.querySelector(".fivesInDreawer")
const tensInDreawer = document.querySelector(".tensInDreawer")
const twentiesInDreawer = document.querySelector(".twentiesInDreawer")
const hundredsInDreawer = document.querySelector(".hundredsInDreawer")



priceTotal.textContent = price



purchaseBtn.addEventListener("click", () => {
    const inputValue = Number(cash.value);
    let cidTotal = cid.reduce((total, item) => total + item[1], 0);
    let cashDue = inputValue - price; 
    cashDue = Number(cashDue.toFixed(2));

    if (inputValue < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    if (inputValue < price) {
        changeDue.textContent = "No change due - customer paid with exact cash";
        return;
    }

    if (cashDue === 0) {
        changeDue.textContent = "No change due - customer paid with exact cash";
        return;
    }

    if (cashDue > cidTotal) {
        changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
        return; 
    }

    console.log(inputValue, cashDue, cidTotal);

    let change = [];
    let originalCashDue = cashDue;

    currencyValue.forEach((item) => {
        let denominationName = item[0];
        let denominationValue = item[1];

        let cidItem = cid.find(cidItem => cidItem[0] === denominationName);

        if (cidItem) {
            let cidDenominationValue = cidItem[1];

            if (cashDue >= denominationValue && cidDenominationValue > 0) {
                let availableUnits = Math.floor(cidDenominationValue / denominationValue);
                let neededUnits = Math.floor(cashDue / denominationValue);
                let unitsToUse = Math.min(availableUnits, neededUnits);

                let usedValue = unitsToUse * denominationValue;

                if (usedValue > 0) {
                    console.log(`${denominationName}: ${unitsToUse}`, `Used Value: ${usedValue}`);
                    cidItem[1] -= usedValue;
                    cashDue -= usedValue;
                    cashDue = Number(cashDue.toFixed(2));

                    change.push([denominationName, usedValue]); 
                }
            }
        }
    });

    if (cashDue > 0) {
        statusValue.textContent = "Status: INSUFFICIENT_FUNDS";
        statusValue.parentElement.style.display = "block";
        change.forEach(item => {
            let denominationName = item[0];
            let usedValue = item[1];
            let cidItem = cid.find(cidItem => cidItem[0] === denominationName);
            if (cidItem) {
                cidItem[1] += usedValue; 
            }
        });
    } else {
        change.forEach(item => {
            let denominationName = item[0];
            let usedValue = item[1];
            let element = document.querySelector(`.${denominationName.toLowerCase()}Value`);
            if (element) {
                if (usedValue > 0) {
                    element.textContent = `$${formatCurrency(usedValue)}`;
                    element.parentElement.style.display = "block"; 
                } else {
                    element.textContent = ""; 
                    element.parentElement.style.display = "none"; 
                }
            }
        });

        if (originalCashDue > 0 && cid.every(item => item[1] === 0)) {
            let changeDisplay = change.map(item => `${item[0]}: $${formatCurrency(item[1])}`).join("\n");
            changeDue.textContent = `Status: CLOSED\n${changeDisplay}`;
            statusValue.textContent = "CLOSED";
        } else {
            let changeDisplay = change.map(item => `${item[0]}: $${formatCurrency(item[1])}`).join("\n");
            changeDue.textContent = `Status: OPEN\n${changeDisplay}`;
            statusValue.textContent = "OPEN";
        }
        statusValue.parentElement.style.display = "block";
    }

    cash.value = ""; 
    console.log(`Remaining Cash Due: ${cashDue}`);
    console.log(cid);
    updateCid();
});

const formatCurrency = (value) => {
    return Number(value.toFixed(2)).toString();
};

const updateCid = () => {
    penniesInDreawer.textContent = `$${formatCurrency(cid[0][1])}`;
    nickelsInDreawer.textContent = `$${formatCurrency(cid[1][1])}`;
    dimesInDreawer.textContent = `$${formatCurrency(cid[2][1])}`;
    quartersInDreawer.textContent = `$${formatCurrency(cid[3][1])}`;
    onesInDreawer.textContent = `$${formatCurrency(cid[4][1])}`;
    fivesInDreawer.textContent = `$${formatCurrency(cid[5][1])}`;
    tensInDreawer.textContent = `$${formatCurrency(cid[6][1])}`;
    twentiesInDreawer.textContent = `$${formatCurrency(cid[7][1])}`;
    hundredsInDreawer.textContent = `$${formatCurrency(cid[8][1])}`;
};

updateCid();