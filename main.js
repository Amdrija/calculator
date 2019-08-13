const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const clearButton = document.querySelector("#clear");
const backspaceButton = document.querySelector("#backspace");
const equalsButton = document.querySelector("#equals");
const dotButton = document.querySelector("#dot");

let dotDisabled = false;

const textbox = document.querySelector("#textbox");
const statusbox = document.querySelector("#status");

const operations = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
};

numberButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
        if (textbox.textContent.length < 12) {
            textbox.textContent += event.target.textContent;
        } else {
            statusbox.textContent = "Expression too long."
        }
    });
});

operationButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
        if (textbox.textContent.length < 12) {
            textbox.textContent += event.target.textContent;
        } else {
            statusbox.textContent = "Expression too long."
        }
        dotDisabled = false;
    });
});

clearButton.addEventListener("click", () => {
    textbox.textContent = "";
    statusbox.textContent = "";
    dotDisabled = false;
});

backspaceButton.addEventListener("click", () => {
    if (textbox.textContent.charAt(textbox.textContent.length - 1) === ".") {
        dotDisabled = false;
    }
    textbox.textContent = textbox.textContent.slice(0, -1);
    if (textbox.textContent.length < 12) {
        statusbox.textContent = "";
    }
});

dotButton.addEventListener("click", (event) => {
    if (!dotDisabled) {
        dotDisabled = true;
        if (textbox.textContent.length < 12) {
            textbox.textContent += event.target.textContent;
        } else {
            statusbox.textContent = "Expression too long."
        }
    }
});

equalsButton.addEventListener("click", () => {

    if (!isNumber(textbox.textContent.slice(-1)) && textbox.textContent.slice(-1) != ".") {
        textbox.textContent = textbox.textContent.slice(0, -1);
    }

    let result = +evaluate(textbox.textContent);
    console.log(result);
    if (isNaN(result)) {
        textbox.textContent = "Error";
        statusbox.textContent = "Division by zero.";
        return;
    }

    textbox.textContent = Math.floor(result * 100000000000) / 100000000000;
    if (textbox.textContent.length > 13) {
        textbox.textContent = (+textbox.textContent).toExponential(5);
    }

    statusbox.textContent = "";
})

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