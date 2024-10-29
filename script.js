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

let leftOperand = rightOperand = '0';
let operator = '+';
let overwrite = true;

buttonsContainer.addEventListener('click', event => {
    if (event.target === buttonsContainer) return;

    const button = event.target;
    const isDigit = button.classList.contains('digit');
    const isDecimalPoint = button.classList.contains('decimal-point');
    const isEquals = button.classList.contains('equals');
    const isOperator = button.classList.contains('operator');
    const result =
        String(operate(Number(leftOperand), operator, Number(rightOperand)));

    if (isDigit) {
        const digit = button.innerText;

        rightOperand = overwrite ? digit : rightOperand + digit;
        overwrite = overwrite && digit === '0';
    }

    if (isDecimalPoint) {
        if (!overwrite && rightOperand.includes('.')) return;

        rightOperand = overwrite ? '0.' : rightOperand + '.';
        overwrite = false;
    }

    if (isOperator) {
        if (!overwrite) {
            rightOperand = result;
        }

        leftOperand = rightOperand;
        operator = button.innerText;
        overwrite = true;
    }

    if (isEquals) {
        rightOperand = result;
        leftOperand = '0';
        operator = '+';
        overwrite = true;
    }

    display.innerText = rightOperand;
})
