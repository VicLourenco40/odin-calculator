const display = document.querySelector('.display');
const buttonsContainer = document.querySelector('.buttons');

let displayContent = display.innerText;

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

buttonsContainer.addEventListener('click', event => {
    if (event.target === buttonsContainer) return;

    const button = event.target;
    const isDigit = button.classList.contains('digit');

    if (isDigit) {
        const digit = button.innerText;

        if (displayContent === '0') {
            displayContent = '';
        }

        displayContent += digit;
    }

    display.innerText = displayContent;
})
