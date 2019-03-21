const keyContainer = document.querySelector('#keyContainer');
const allKeys = document.querySelectorAll('#keyContainer div');

styleKeys();
function styleKeys() {
    for (let i = 0; i < allKeys.length; i++) {
        allKeys[i].addEventListener('mouseover', () => {
            allKeys[i].classList.add('hover');
         })
        allKeys[i].addEventListener('mouseleave', () => {
            allKeys[i].classList.remove('hover');
        })
        allKeys[i].addEventListener('mousedown', () => {
            allKeys[i].classList.add('click');
         })
        allKeys[i].addEventListener('mouseup', () => {
            allKeys[i].classList.remove('click');
        })
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
    if (operator == '+') {
        return add(firNum, secNum);
    } else if (operator == '-') {
        return subtract(firNum, secNum);
    } else if (operator == '*') {
        return multiply(firNum, secNum);
    } else if (operator == '/') {
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