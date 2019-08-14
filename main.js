const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const clearButton = document.querySelector("#clear");
const backspaceButton = document.querySelector("#backspace");
const equalsButton = document.querySelector("#equals");
const dotButton = document.querySelector("#dot");

let dotDisabled = false;
let operationDisabled = true;

const textbox = document.querySelector("#textbox");
const statusbox = document.querySelector("#status");
const maxNumberLength = 12;

const operations = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
};

document.querySelectorAll(".button").forEach((button) => button.addEventListener("click", (event) => {
    event.target.classList.add("clicked");
}));
document.querySelectorAll(".button").forEach((button) => button.addEventListener("transitionend", (event) => {
    event.target.classList.remove("clicked");
}));

numberButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        operationDisabled = false;
        addText(event.target.textContent)
    });
});

operationButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
        if (!operationDisabled) {
            addText(event.target.textContent);
            dotDisabled = false;
            operationDisabled = true;
        }
    });
});

clearButton.addEventListener("click", clearText);

backspaceButton.addEventListener("click", backspaceText);

dotButton.addEventListener("click", dotPress);

equalsButton.addEventListener("click", calculateResultText);

window.addEventListener("keydown", keyPress);

function keyPress(event) {
    if (event.shiftKey) {
        switch (event.keyCode) {
            case 56:
                document.querySelector("#multiplication").click();
                break;
            case 61:
                document.querySelector("#addition").click();
                break;
            case 8:
                document.querySelector("#clear").click();
                break;
        }
        return;
    }

    if (event.keyCode >= 48 && event.keyCode <= 57) {
        document.querySelector(`#number-${event.keyCode - 48}`).click();
        return;
    };

    switch (event.keyCode) {
        case 191:
            document.querySelector("#division").click();
            break;
        case 173:
            document.querySelector("#subtraction").click();
            break;
        case 190:
            document.querySelector("#dot").click();
            break;
        case 61:
        case 13:
            document.querySelector("#equals").click();
            break;
        case 8:
            document.querySelector("#backspace").click();
            break;
    }

}



function dotPress() {
    if (!dotDisabled) {
        dotDisabled = true;
        addText(".");
    }
}

function addText(text) {
    if (textbox.textContent.length < maxNumberLength) {
        textbox.textContent += text;
    } else {
        statusbox.textContent = "Expression too long."
    }
}

function clearText() {
    textbox.textContent = "";
    statusbox.textContent = "";
    dotDisabled = false;
    operationDisabled = true;
}

function backspaceText() {
    if (textbox.textContent.charAt(textbox.textContent.length - 1) === ".") {
        dotDisabled = false;
    }
    if (textbox.textContent.charAt(textbox.textContent.length - 1) in operations) {
        operationDisabled = false;
    }
    textbox.textContent = textbox.textContent.slice(0, -1);
    if (textbox.textContent.length < maxNumberLength) {
        statusbox.textContent = "";
    }
}

function calculateResultText() {
    if (!isNumber(textbox.textContent.slice(-1)) && textbox.textContent.slice(-1) != ".") {
        textbox.textContent = textbox.textContent.slice(0, -1);
    }

    let result = +evaluate(textbox.textContent);
    if (isNaN(result)) {
        textbox.textContent = "Error";
        statusbox.textContent = "Division by zero.";
        return;
    }

    textbox.textContent = variableRound(result);
    statusbox.textContent = "";

    /*
    ! DON'T ENABLE THE DOT AGAIN, IF THE RESULT IS DECIMAL, YOU DON'T WANT TO ADD ANOTHER DOT
     */
    operationDisabled = false;
}

function variableRound(number) {
    number = number.toString();
    let dotPosition = number.indexOf(".");

    if (dotPosition == -1) {
        if (number.length > maxNumberLength) {
            return (+number).toExponential(5);
        }
        return number;
    }

    if (dotPosition > maxNumberLength) {
        return (+number).toExponential(5);
    }

    let power10 = Math.pow(10, maxNumberLength - dotPosition);
    return Math.round(+number * power10) / power10;

}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0)
        return "Infinity";
    return a / b;
}

function operate(a, b, operator) {
    return operations[operator](a, b);
}

function evaluate(expression) {
    let operatorPrecedence = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
    }
    let operatorRegex = /[+\-\/*]/;
    let valueStack = [];
    let operatorStack = [];

    let number = "";

    for (let char of expression) {
        if (char.match(operatorRegex)) {
            valueStack.push(+number);
            number = "";

            while (operatorStack.length > 0 && operatorPrecedence[operatorStack[operatorStack.length - 1]] >= operatorPrecedence[char]) {
                let operator = operatorStack.pop();
                let operand2 = valueStack.pop();
                let operand1 = valueStack.pop();
                valueStack.push(operate(operand1, operand2, operator));
            }
            operatorStack.push(char);
        } else {
            number += char;
        }
    }
    valueStack.push(+number);

    while (operatorStack.length > 0) {
        let operator = operatorStack.pop();
        let operand2 = valueStack.pop();
        let operand1 = valueStack.pop();
        valueStack.push(operate(operand1, operand2, operator));
    }

    return valueStack.pop();
}

function isNumber(char) {
    return char.codePointAt() >= "0".codePointAt() && char.codePointAt() <= "9".codePointAt();
}