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

let operand = '0';
let displayOperand = '0';
let operator = '';
let overwriteDisplayOperand = true;

buttonsContainer.addEventListener('click', event => {
    if (event.target === buttonsContainer) return;

    const button = event.target;
    const isDigit = button.classList.contains('digit');
    const isDecimalPoint = button.classList.contains('decimal-point');
    const isOperator = button.classList.contains('operator');
    const isEquals = button.classList.contains('equals');
    const forceOperation = isOperator && operator && !overwriteDisplayOperand;

    if (isDigit) {
        const digit = button.innerText;

        displayOperand =
            overwriteDisplayOperand ? digit : displayOperand + digit;
        overwriteDisplayOperand = displayOperand === '0';
    }

    if (isDecimalPoint) {
        if (displayOperand.includes('.') && !overwriteDisplayOperand) return;

        displayOperand = overwriteDisplayOperand ? '0.' : displayOperand + '.';
        overwriteDisplayOperand = false;
    }

    if (isEquals || forceOperation) {
        if (!operator) return;

        displayOperand =
            operate(Number(operand), operator, Number(displayOperand));
        overwriteDisplayOperand = true;
        operator = '';
    }

    if (isOperator) {
        operator = button.innerText;
        operand = displayOperand;
        overwriteDisplayOperand = true;
    }

    display.innerText = displayOperand;
})
