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
            operatorToggle(key);
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
    window.addEventListener('keydown', test);
    window.addEventListener('transitionend', removeHover);
}

function test(e) {
    const key = document.querySelector(`div[data-key='${e.keyCode}']`);
    if (!key) console.log(e.keyCode);
    key.classList.add('keyed');
}

function removeHover() {
    allKeys.forEach(key => {
        key.classList.remove('keyed');
    })
}

function getInput(key) {
    if (key.innerText === '.') {
        if (input.search(/[.]/g) == -1 || input.search(operatorCheck) > -1) {
            populateDisplay(key.innerText);
            setInput(key.innerText);
        }
    } else {
        screen.textContent = input += key.innerText;
        if (input.length > 9) {
            alert('Ten digit limit.');
        }
    }
}

function operatorToggle(key) {
    if (input === '') {
        return;
    } if (key.innerText === 'Del') {
        setInput(input.replace(/[0-9]$|[\/\-\+\*]$/g, ''));
        populateDisplay(input);
    } else if (input.search(/[0-9]/g) > -1 && input.search(/[0-9]$/g) > -1) {
        concatInput(key.textContent.trim());
        populateDisplay(input);
    } else if (input.search(operatorCheck) > -1) {
        setInput(input.replace(/[\/\-\+\*]$/g, key.innerText.trim()));
        populateDisplay(input);
    }
}

function calculate(key) {
    if (key.innerText === 'C') {
        populateDisplay(0);
        populateResult(0);
        clearInput();
    } else if (key.innerText === '=' && input.search(operatorCheck) > -1) {
        shuntInput();
        parseShunt();
    } else if (key.innerText === '=' && input.search(operatorCheck) === -1) {
        populateDisplay(input);
    }
}

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
    populateResult(resultStack.join(''));
}

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
