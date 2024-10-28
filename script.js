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

function operate(a, operator, b) {
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
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

        firstOperand = Number(overwriteOperand ? digit : firstOperand + digit);
        overwriteOperand = firstOperand === 0;
    }

    if (isEquals || forceOperation) {
        if (!operator) return;

        firstOperand = operate(firstOperand, operator, secondOperand);
        overwriteOperand = true;
        operator = '';
    }

    if (isOperator) {
        operator = button.innerText;
        secondOperand = firstOperand;
        overwriteOperand = true;
    }

    display.innerText = firstOperand;
})
