const display = document.querySelector('.display');
const buttonsContainer = document.querySelector('.buttons');

let leftOperand = rightOperand = 0;
let operator = '+';
let displayContent = '0';
let overwrite = false;

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
        case '*':
        case 'x': return multiply(a, b);
        case '/':
        case '÷': return divide(a, b);
        case '%': return mod(a, b);
    }
}

function addDigit(digit) {
    displayContent =
        (overwrite || displayContent === '0') ? digit : displayContent + digit;
    rightOperand = Number(displayContent);
    overwrite = false;
}

function addDecimalPoint() {
    if (!overwrite && displayContent.includes('.')) return;

    displayContent = overwrite ? '0.' : displayContent + '.';
    rightOperand = Number(displayContent);
    overwrite = false;
}

function toggleSign() {
    rightOperand = overwrite ? 0 : rightOperand * -1;
    displayContent = String(rightOperand);
    overwrite = false;
}

function setOperator(newOperator) {
    if (!overwrite) {
        const result = operate(leftOperand, operator, rightOperand);

        displayContent = String(result);
        leftOperand = rightOperand = result;
    }

    operator = newOperator;
    overwrite = true;
}

function calculate() {
    const result = operate(leftOperand, operator, rightOperand);

    displayContent = String(result);
    leftOperand = rightOperand = result;
    operator = '+';
    overwrite = true;
}

function clear() {
    displayContent = '0';
    rightOperand = 0;
    overwrite = true;
}

function reset() {
    displayContent = '0';
    leftOperand = rightOperand = 0;
    operator = '+';
}

function updateDisplay() {
    const error = displayContent === 'NaN' ||
        displayContent.includes('Infinity');

    if (error) {
        display.innerText = 'Error';
        reset();
    } else {
        const decimalPoint = displayContent.slice(0, 9).includes('.');
        display.innerText = displayContent.slice(0, 8 + decimalPoint);
    }
}

buttonsContainer.addEventListener('click', event => {
    const isDigit = event.target.classList.contains('digit');
    const isOperator = event.target.classList.contains('operator');

    if (isDigit) addDigit(event.target.innerText);
    else if (isOperator) setOperator(event.target.innerText);

    updateDisplay();
});

document.querySelector('.decimal-point')
    .addEventListener('click', addDecimalPoint);
document.querySelector('.sign').addEventListener('click', toggleSign);
document.querySelector('.equal').addEventListener('click', calculate);
document.querySelector('.clear').addEventListener('click', clear);
document.querySelector('.reset').addEventListener('click', reset);

document.addEventListener('keydown', event => {
    const isDigit = !isNaN(event.key);
    const isOperator = ('+-*/%').includes(event.key);



    if (isDigit) addDigit(event.key);
    else if (isOperator) setOperator(event.key);
    else switch(event.key) {
        case '.': addDecimalPoint(); break;
        case '_': toggleSign(); break;
        case 'Enter': calculate(); break;
        case 'Backspace': clear(); break;
        case 'Escape': reset(); break;
    }

    updateDisplay();
});
