const keyContainer = document.querySelector('#keyContainer');
const allKeys = document.querySelectorAll('#keyContainer div');
const screen = document.querySelector('#screen h1');
const operatorKeys = document.querySelectorAll('.operator');
const numberKeys = document.querySelectorAll('.number')
let input = '';
let firNum = 0;
let secNum = 0;
let operator = 0;
let inputArray = [];
let operatorCheck = /[\/\-\+\*]/g;
let numCheck = /[0-9]+[.][0-9]+|[0-9]+|[.][0-9]+/g;

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
        key.addEventListener('transitionend', removeTransition);
        })
    function removeTransition(e) {
        if (e.propertyName !== 'background-color') return;
        this.classList.remove('clicked');
    }
    operatorKeys.forEach(key => {
        key.addEventListener('mousedown', () => {
            operatorToggle(key);
            calculate(key);
        })
    })
    numberKeys.forEach(key => {
        key.addEventListener('mousedown', () => {
            getInput(key);
        })
    })
}

function getInput(key) {
    screen.textContent = input += key.innerText;
}

function operatorToggle(key) {
    if (input === '') {
        return;
    } else if (input.search(/^[0-9]/g) == 0 && input.search(operatorCheck) < 0) {
        screen.textContent = input += key.textContent.trim();
    } else if (input.search(operatorCheck) > -1) {
        screen.textContent = input = input.replace(/[\/\-\+\*]$/g, key.innerText.trim());
    }
}

function calculate(key) {
    if (key.innerText === 'C') {
        screen.textContent = input = '';
    } else if (key.innerText === '=') {
        inputArray = input.match(numCheck);
        operator = input.match(operatorCheck).toString();
        firNum = Number(inputArray[0]);
        secNum = Number(inputArray[1]);
        screen.textContent = input = (operate(operator, firNum, secNum).toString());
    }
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
    return Number((firNum / secNum).toFixed(2));
}

function operate(operator, firNum, secNum) {
    if (operator === '+') {
        return add(firNum, secNum);
    } else if (operator === '-') {
        return subtract(firNum, secNum);
    } else if (operator === '*') {
        return multiply(firNum, secNum);
    } else if (operator === '/') {
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