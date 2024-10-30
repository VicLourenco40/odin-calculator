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

function handleDigitClick(digit) {
    displayContent = overwrite ? digit : displayContent + digit;
    rightOperand = Number(displayContent);
    overwrite = overwrite && digit === '0';
}

function handleDecimalPointClick() {
    if (!overwrite && displayContent.includes('.')) return;

    displayContent = overwrite ? '0.' : displayContent + '.';
    rightOperand = Number(displayContent);
    overwrite = false;
}

function handleOperatorClick(newOperator) {
    if (!overwrite) {
        const result = operate(leftOperand, operator, rightOperand);

        displayContent = String(result);
        leftOperand = rightOperand = result;
    };

    operator = newOperator;
    overwrite = true;
}

function handleEqualsClick() {
    const result = operate(leftOperand, operator, rightOperand);

    displayContent = String(result);
    rightOperand = result;
    leftOperand = 0;
    operator = '+';
    overwrite = true;
}

function handleClearClick() {
    displayContent = '0';
    rightOperand = 0;
    overwrite = true;
}

function handleAllClearClick() {
    displayContent = '0';
    leftOperand = rightOperand = 0;
    operator = '+';
    overwrite = true;
}

let leftOperand = rightOperand = 0;
let operator = '+';
let displayContent = display.innerText;
let overwrite = true;

buttonsContainer.addEventListener('click', event => {
    if (event.target === buttonsContainer) return;

    const button = event.target;
    const isDigit = button.classList.contains('digit');
    const isDecimalPoint = button.classList.contains('decimal-point');
    const isOperator = button.classList.contains('operator');
    const isEquals = button.classList.contains('equals');
    const isClear = button.classList.contains('clear');
    const isAllClear = button.classList.contains('all-clear');

    if (isDigit) handleDigitClick(button.innerText);
    else if (isDecimalPoint) handleDecimalPointClick();
    else if (isOperator) handleOperatorClick(button.innerText);
    else if (isEquals) handleEqualsClick();
    else if (isClear) handleClearClick();
    else if (isAllClear) handleAllClearClick();

    display.innerText = displayContent;
});
