const allKeys = document.querySelectorAll('.keys div');
const screen = document.querySelector('#screen h3');
const resultScreen = document.querySelector('#resultScreen h1');
const operatorKeys = document.querySelectorAll('.operator');
const numberKeys = document.querySelectorAll('.number')
const functionKeys = document.querySelectorAll('.function');
let input = '';
let inputArray = [];
const operatorCheck = /[\/\-\+\*]/g;
const numCheck = /[0-9]+[.][0-9]+|[0-9]+|[.][0-9]+/g;
const inputCheck = /[0-9]+[.][0-9]+|[0-9]+|[.][0-9]+|[\/\-\+\*]/g;
populateDisplay(0);
populateResult(0);
initKeys();
//Initialize Calculator keys to take inputs and show hover/click events.
function initKeys() {
    allKeys.forEach(key => {
        key.addEventListener('mouseover', () => {
            key.classList.add('hovered');
        })
        key.addEventListener('mouseleave', () => {
            key.classList.remove('hovered');
        })
        key.addEventListener('mousedown', () => {
            key.classList.add('clicked');
        })
        key.addEventListener('mouseup', () => {
            key.classList.remove('clicked');
        })
    })
    operatorKeys.forEach(key => {
        key.addEventListener('mousedown', () => {
            operatorDisplayToggle(key);
        })
    })
    numberKeys.forEach(key => {
        key.addEventListener('mousedown', () => {
            getInput(key);
        })
    })
    functionKeys.forEach(key => {
        key.addEventListener('mousedown', () => {
            calculate(key);
        })
    })
    window.addEventListener('keydown', readKey);
    window.addEventListener('transitionend', removeHover);
}
// Math functions.
function add(firNum, secNum) {
    return firNum + secNum;
}

function subtract(firNum, secNum) {
    return firNum - secNum;
}

function multiply(firNum, secNum) {
    return firNum * secNum;
}

function divide(firNum, secNum) {
    return (firNum / secNum);
}

function operate(value, firNum, secNum) {
    if (value === '+') {
        return add(firNum, secNum);
    } else if (value === '-') {
        return subtract(firNum, secNum);
    } else if (value === '*') {
        return multiply(firNum, secNum);
    } else if (value === '/') {
        return divide(firNum, secNum);
    } 
}

function populateDisplay(item) {
    screen.textContent = item;
}

function populateResult(item) {
    resultScreen.textContent = item;
}

function setInput(item) {
    input = item;
}

function concatInput(item) {
    input += item;
}

function clearAllDisplay() {
    screen.textContent = '';
    resultScreen.textContent = '';
}

function clearInput() {
    input = '';
}
// Clear screen or delete a single number as well as toggle the key between C and A/C.
function toggleClear(key) {
    if (key.innerText === "A/C") {
        populateDisplay(0);
        populateResult(0);
        clearInput();
    } else if (key.innerText === "C") {
        setInput(input.replace(/[\.][0-9]+$|[0-9]+[\.][0-9]+$|[0-9]+$|[\.]$/g, ''));
        populateDisplay(input);
        key.innerHTML = '<p>A/C</p>';
    }
}

function toggleDel() {
    if (input) {
        const clear = document.querySelector('#keyClear');
        clear.innerHTML = '<p>C<p>';
    }
}
// Toggle add/subtract key between adding and subtracting.
function toggleAdd(key) {
    if (key.innerText === '-') {
        key.innerHTML = '<p>+</p>';
    } else if (key.innerText === '+') {
        key.innerHTML = '<p>-</p>';
    }
    return key.innerText;
}
// Alert user when the character limit is reached.
function charLimitAlert() {
    if (input.length >= 32) {
        alert("33 character limit");
    }
}
// Format the result based on number of decimal places.
function generateResult(item) {
    if (Number.isInteger(Number(item))) {
        return item;
    } else {
        return parseFloat(item)
                .toFixed(4)
                .replace(/[0]+$/g, '');
    }
}
// Two functions to count number of operators and decimals in the input string.
String.prototype.countOp = function(string) {
    let count = 0;
    for (let i = 0; i < string.length; i++) {
        if (string.charAt(i) === '/' || string.charAt(i) === '*' || string.charAt(i) === '+' || string.charAt(i) === '-') {
            count++;
        }
    }
    return count;
}

String.prototype.countDec = function(string) {
    let count = 0
    for (let i = 0; i < string.length; i++) {
        if (string.charAt(i) === '.') {
            count++;
        }
    }
    return count;
}
// Read input from keyboard, display on screen and store in input variable.
// Runs calculation function if "=" is pressed.
function readKey(e) {
    charLimitAlert();
    while (input.length < 32) {
        const key = document.querySelector(`div[data-key='${e.keyCode}']`);
        if (!key) {
            return;
        }
        key.classList.add('keyed');
        if (key.innerText === '=') {
            calculate(key);
        } else {
            concatInput(key.innerText);
            populateDisplay(input);
        }
        toggleDel();
        break;
    }
}

function removeHover() {
    allKeys.forEach(key => {
        key.classList.remove('keyed');
    })
}
// Read input from clicked div, display and store.
// Prevents multiple decimals from being placed after another & prevents input after 32 characters.
function getInput(key) {
    charLimitAlert();
    if (key.innerText === '.') {
        while (input.length < 33) {
            if (input.search(/[\.]/g) == -1 || String.prototype.countOp(input) == (String.prototype.countDec(input))) {
                concatInput(key.innerText);
                populateDisplay(input);
            }
            break;
        }
    } else {
        while (input.length < 32) {
            concatInput(key.innerText);
            populateDisplay(input);
            break;
        }
    }
    toggleDel();
}
//Displays and stores operators & will toggle between operators when a new one is clicked.
function operatorDisplayToggle(key) {
    charLimitAlert();
    while (input.length < 32) {
        if (input === '') {
            return;
        } if (input.search(/[0-9]/g) > -1 && input.search(/[0-9]$/g) > -1) {
            concatInput(key.textContent.trim());
            populateDisplay(input);
            toggleAdd(key);
        } else if (input.search(operatorCheck) > -1) {
            setInput(input.replace(/[\/\-\+\*]$/g, key.innerText.trim()));
            populateDisplay(input);
            toggleAdd(key);
        }
        break;
    }
}
// Calculates the result of input and displays on result screen.
function calculate(key) {
    toggleClear(key);
    if (key.innerText === '=' && input.search(operatorCheck) > -1) {
        shuntInput();
        parseShunt();
    } else if (key.innerText === '=' && input.search(operatorCheck) === -1) {
        populateResult(input);
        egg();
    }
}
// Takes input variable and returns in RPN format.
function shuntInput() {
    var outputQueue = [];
    var operatorStack =[];
    var precedence = {
        '*' : 3,
        '/' : 3,
        '+' : 2,
        '-' : 2
    }
    Array.prototype.peek = function() {
        return this.slice(-1)[0];
    }

    inputArray = input.match(inputCheck);
    inputArray.forEach(function(value) {
        if (parseFloat(value)) {
            outputQueue.push(value);
        } else {
            while (operatorStack.peek() && precedence[value] <= precedence[operatorStack.peek()]) {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(value);
        }
    })
    return (outputQueue.concat(operatorStack.reverse()));
}
//Parses RPN from shuntInput() and returns a non-formatted integer or float based on previously declaired math functions.
function parseShunt() {
    let resultStack =[];
    shuntInput().forEach(function(value){
        if (parseFloat(value)) {
            resultStack.push(value);
        } else {
            var firNum = resultStack.pop();
            var secNum = resultStack.pop();
            if (!parseFloat(value)) {
                resultStack.push(operate(value, parseFloat(secNum), parseFloat(firNum)));
            }
        }
    })
    populateResult(generateResult(resultStack.join('')));
    egg();
}

function egg() {
    if (resultScreen.innerText == '111126') alert("You have been using the 'Limited Application Mathematical Equipment'. \n\t\t\t\t Built by Dareos Meyer 4/2019");
}