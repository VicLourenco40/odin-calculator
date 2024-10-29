const display = document.querySelector('.display');
const buttonsContainer = document.querySelector('.buttons');

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
    return a / b;
}

function mod(a, b) {
    return a % b;
}

function operate(a, operator, b) {
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case 'x': return multiply(a, b);
        case '÷': return divide(a, b);
        case '%': return mod(a, b);
    }
}

let firstOperand = 0;
let secondOperand = 0;
let operator = '';
let overwriteOperand = true;

buttonsContainer.addEventListener('click', event => {
    if (event.target === buttonsContainer) return;

    const button = event.target;
    const isDigit = button.classList.contains('digit');
    const isOperator = button.classList.contains('operator');
    const isEquals = button.classList.contains('equals');
    const forceOperation = isOperator && operator && !overwriteOperand;

    if (isDigit) {
        const digit = button.innerText;

        secondOperand = Number(overwriteOperand ? digit : secondOperand + digit);
        overwriteOperand = secondOperand === 0;
    }

    if (isEquals || forceOperation) {
        if (!operator) return;

        secondOperand = operate(firstOperand, operator, secondOperand);
        overwriteOperand = true;
        operator = '';
    }

    if (isOperator) {
        operator = button.innerText;
        firstOperand = secondOperand;
        overwriteOperand = true;
    }

    display.innerText = secondOperand;
})
