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

function Calculate(operandA, operator, operandB) {
    operandA = +operandA;
    operandB = +operandB;

    
    if (!methods[operator] || isNaN(operandA) || isNaN(operandB)) {
        if(!isNaN(operandA))
            return operandA;
        return NaN;
    }
    
    if(operator === "/" && operandB === 0)
    return "You can't!";

    calculated = true;

    let result = methods[operator](operandA, operandB);
    return result % 1 !== 0 ? result.toFixed(2) : result;
}

function Clear(){
    operandA = "0";
    operator = "";
    operandB = "";
    expressionField.value = `${operandA} ${operator} ${operandB}`;
}

function AddDot(){
    if(operator === ""){
        if(isNaN(operandA)){
            return;
        }

        if(calculated){
            Clear();
            calculated = false;
        }

        if(operandA.slice("").indexOf(".") === -1)
            operandA += ".";
    }else{
        if(operandB.slice("").indexOf(".") === -1)
            operandB += ".";
    }
    expressionField.value = `${operandA} ${operator} ${operandB}`;
}

function AddNumber(num){
    if(operator === ""){
        if(isNaN(operandA)){
            return;
        }

        if(calculated){
            Clear();
            calculated = false;
        }

        if(operandA === "0" && num === 0)
            return;
        else if (operandA === "0" && num !== 0)
            operandA = "";

        operandA += num;
    } else {
        operandB += num;
    }
    expressionField.value = `${operandA} ${operator} ${operandB}`;
}

function SetOperator(oper){
    if(isNaN(operandA)){
        return;
    }

    if(calculated){
        calculated = false;
    }

    if(operator !== "" && operandB !== ""){
        operandA = Calculate(operandA, operator, operandB);
        operandB = "";
    }

    operator = oper;
    expressionField.value = `${operandA} ${operator} ${operandB}`;
}

function SolveEquation(){
    operandA = Calculate(operandA, operator, operandB).toString();
    operator = "";
    operandB = "";
    expressionField.value = `${operandA} ${operator} ${operandB}`;
}

function Backspace(){
    if(operator === ""){
        if(isNaN(operandA)){
            return;
        }

        if(calculated){
            Clear();
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
}

// UI Numbers
for(let button of buttonNumbers){
    button.addEventListener('click', ()=>{
        AddNumber(+button.value);
    });
}

// UI Operators
for(let button of buttonsOperators){
    button.addEventListener('click', () => {
        SetOperator(button.value);
    });
}

// UI Special
buttonDot.addEventListener('click', () => {
    AddDot();
});

buttonSolve.addEventListener('click', () => {
    SolveEquation();
});

buttonClear.addEventListener('click', () => {
    Clear();
});

buttonBack.addEventListener('click', () => {
    Backspace();
});

// Keyboard
document.addEventListener('keydown', (event) =>{
    if(event.key >= "0" && event.key <= "9"){
        AddNumber(+event.key);
    }

    if(
        event.key === "+" ||
        event.key === "-" ||
        event.key === "/" ||
        event.key === "*"
        ){
            SetOperator(event.key);
        }

    if(event.key === "Shift"){
        SolveEquation();
    }

    if(event.key === "."){
        AddDot();
    }

    if(event.key === "Backspace"){
        Backspace();
    }

    if(event.key === "Escape"){
        Clear();
    }
});