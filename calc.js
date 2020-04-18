// odin calculator project by simmonsth

// operator functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const exp = (a, b) => a ** b;

const operate = function(n1, operator, n2) {
    const operators = { "+": add(n1, n2),
                        "-": subtract(n1, n2),
                        "/": divide(n1, n2),
                        "*": multiply(n1, n2),
                        "**": exp(n1, n2) };
    return operators[operator];
}

// stored user operation
let storedInput = "";       // displayed to main via displayMain()
let currentInputs = "";     // displayed to lower via displayLower()
let equation = [];          // stored operation to be evaluated by operate()

const displayMain = () => document.querySelector('.display').setAttribute('value', storedInput);
const displayLower = () => document.querySelector('.current-input').setAttribute('value', currentInputs);

// calculator key listeners
const numbers = document.querySelectorAll('.ckey');

numbers.forEach(ckey => ckey.addEventListener('click', function() {
        storedInput += ckey.textContent;
        currentInputs += ckey.textContent;
        displayMain();
        displayLower();
    }));

// decimal "." input listener
const decimal = document.querySelector('.decimal');

decimal.addEventListener('click', function() {
    if (storedInput.includes('.')) {
        return;
    } else {
        storedInput += decimal.textContent;
        currentInputs += decimal.textContent;
        displayMain();
        displayLower();
    }    
});

// operators listener
const operators = document.querySelectorAll('.operator');

operators.forEach(op => op.addEventListener('click', function() {
        equation.push(Number(storedInput));
        equation.push(op.getAttribute('value'));
        storedInput += op.getAttribute('value');
        if (equation.length >= 3) {
            equation.unshift(operate(...equation.splice(0,3)));
            storedInput = equation[0];
            displayMain();
        }
        currentInputs += op.getAttribute('value');
        storedInput = "";
        displayLower();
    }));

// clear listener (all clear fresh start)
const clear = document.querySelector('.clear');

clear.addEventListener('click', function() {
    storedInput = '';
    equation = [];
    currentInputs = storedInput;
    console.log(equation);
    console.log(currentInputs);
    displayMain();
    displayLower();
});

// backspace listener
const backspace = document.querySelector('.backspace');

backspace.addEventListener('click', function() {
    if (!storedInput) {
        return;
    } else {
        storedInput = storedInput.slice(0, -1);
        currentInputs = currentInputs.slice(0, -1);
        displayMain();
        displayLower();
    }   
});

// equals listener (perform calculation and display)
const equals = document.querySelector('.equals');

equals.addEventListener('click', function() {
    equation.push(Number(storedInput));
    equation.unshift(operate(...equation.splice(0,3)));
    storedInput = `${equation[0]}`;
    if (storedInput === 'Infinity') {
        storedInput = ">:|";
        displayMain();
        displayLower();
    } else {
        currentInputs = storedInput;
        equation = [];
        displayMain();
        displayLower();
        storedInput = '';
    }
});