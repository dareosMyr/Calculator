const keyContainer = document.querySelector('#keyContainer');
const allKeys = document.querySelectorAll('#keyContainer div');
const screen = document.querySelector('#screen h1');
const operatorKeys = document.querySelectorAll('.operator');
const numberKeys = document.querySelectorAll('.number')
const functionKeys = document.querySelectorAll('.function');
let input = '';
let operator = 0;
let inputArray = [];
let firNum;
let secNum;
let operatorCheck = /[\/\-\+\*]/g;
let numCheck = /[0-9]+[.][0-9]+|[0-9]+|[.][0-9]+/g;
let inputCheck = /[0-9]+[.][0-9]+|[0-9]+|[.][0-9]+|[\/\-\+\*]/g;

initKeys();
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
}

function getInput(key) {
    if (key.innerText === '.') {
        if (input.search(/[.]/g) == -1 || input.search(operatorCheck) > -1) {
            screen.textContent = input += key.innerText;
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
    }
    if (key.innerText === 'Del') {
        screen.textContent = input = input.replace(/[0-9]$|[\/\-\+\*]$/g, '');
    } else if (input.search(/[0-9]/g) > -1 && input.search(/[0-9]$/g) > -1) {
        screen.textContent = input += key.textContent.trim();
    } else if (input.search(operatorCheck) > -1) {
        screen.textContent = input = input.replace(/[\/\-\+\*]$/g, key.innerText.trim());
    }
}

function calculate(key) {
    if (key.innerText === 'C') {
        screen.textContent = input = '';
    } else if (key.innerText === '=' && input.search(operatorCheck) > -1) {
        shuntInput();
        parseShunt();
        
        
        /* inputArray = input.match(numCheck);
        operator = input.match(operatorCheck).toString();
        firNum = Number(inputArray[0]);
        secNum = Number(inputArray[1]);
        screen.textContent = input = (operate(operator, firNum, secNum).toString());
        if (input.length > 9) {
            screen.textContent = parseFloat(input).toFixed(2);
        } */
    } else if (key.innerText === '=' && input.search(operatorCheck) == -1) {
        screen.textContent = input;
    }
}

function populateDisplay(item) {
    screen.textContent = item;
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
    console.log(outputQueue.concat(operatorStack.reverse()));
    return (outputQueue.concat(operatorStack.reverse()));
}

function parseShunt() {
    var resultStack =[];
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
    populateDisplay(resultStack.join(''));
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

/* function createKeys() {
    for (let i = 0; i < 15; i++) {
        var keys = document.createElement('div');
        //keys.setAttribute('class', 'keys');
        //keys.setAttribute('id', `${i}`);
        //if (i >= 1 && i < 10) {
        //    keys.textContent = `${i}`;
       // }
        keyContainer.appendChild(keys);
    }
}
*/