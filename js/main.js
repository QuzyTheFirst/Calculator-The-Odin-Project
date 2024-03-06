const buttonNumbers = document.querySelectorAll(".number-buttons button");
const buttonsOperators = document.querySelectorAll(".operator-buttons button");

const buttonDot = document.querySelector(".button-dot");
const buttonSolve = document.querySelector(".button-solve ");
const buttonClear = document.querySelector(".button-clear");
const buttonBack = document.querySelector(".button-backspace");

const expressionField = document.querySelector(".expression-field");

let operandA = "0";
let operator = "";
let operandB = "";
expressionField.value = `${operandA} ${operator} ${operandB}`;

let calculated = false;

let methods = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "%": (a, b) => a % b,
};

function calculate(operandA, operator, operandB) {
    operandA = +operandA;
    operandB = +operandB;

    if (!methods[operator] || isNaN(operandA) || isNaN(operandB)) {
        return NaN;
    }
    
    if(operator === "/" && operandB === 0)
    return "You can't!";

    calculated = true;

    let result = methods[operator](operandA, operandB);
    return result % 1 !== 0 ? result.toFixed(2) : result;
}

function clear(){
    operandA = "0";
    operator = "";
    operandB = "";
    expressionField.value = `${operandA} ${operator} ${operandB}`;
}

// Numbers
for(let button of buttonNumbers){
    button.addEventListener('click', ()=>{
        if(operator === ""){
            if(isNaN(operandA)){
                return;
            }

            if(calculated){
                clear();
                calculated = false;
            }

            if(operandA === "0" && button.value === "0")
                return;
            else if (operandA === "0" && button.value !== "0")
                operandA = "";

            operandA += button.value;
        } else {
            operandB += button.value;
        }
        expressionField.value = `${operandA} ${operator} ${operandB}`;
    });
}

// Operators
for(let button of buttonsOperators){
    button.addEventListener('click', () => {
        if(isNaN(operandA)){
            return;
        }

        if(calculated){
            calculated = false;
        }

        if(operator !== "" && operandB !== ""){
            operandA = calculate(operandA, operator, operandB);
            operandB = "";
        }

        operator = button.value;
        expressionField.value = `${operandA} ${operator} ${operandB}`;
    });
}

// Special
buttonDot.addEventListener('click', () => {
    if(operator === ""){
        if(isNaN(operandA)){
            return;
        }

        if(calculated){
            clear();
            calculated = false;
        }

        if(operandA.slice("").indexOf(".") === -1)
            operandA += ".";
    }else{
        if(operandB.slice("").indexOf(".") === -1)
            operandB += ".";
    }
    expressionField.value = `${operandA} ${operator} ${operandB}`;
});

buttonSolve.addEventListener('click', () => {
    operandA = calculate(operandA, operator, operandB).toString();
    operator = "";
    operandB = "";
    expressionField.value = `${operandA} ${operator} ${operandB}`;
});

buttonClear.addEventListener('click', () => {
    clear();
});

buttonBack.addEventListener('click', () => {
    if(operator === ""){
        if(isNaN(operandA)){
            return;
        }

        if(calculated){
            clear();
            calculated = false;
        }

        if(operandA.length > 0)
            operandA = operandA.slice(0, -1);

        if(operandA === "")
            operandA = "0";
    }else{
        if(operandB === "")
            operator = "";

        if(operandB.length > 0)
            operandB = operandB.slice(0, -1);
    }
    expressionField.value = `${operandA} ${operator} ${operandB}`;
});