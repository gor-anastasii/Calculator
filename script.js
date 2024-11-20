const allLoadings = document.querySelectorAll('.loading');
const toggler = document.getElementById('toggle');
const copyInput = document.querySelector('.copy-input')
const input = document.querySelector('.input')

const zero = document.querySelector('.zer')
const one = document.querySelector('.one')
const two = document.querySelector('.two')
const three = document.querySelector('.thr')
const four = document.querySelector('.fou')
const five = document.querySelector('.fiv')
const six = document.querySelector('.six')
const seven = document.querySelector('.sev')
const eight = document.querySelector('.eigh')
const nine = document.querySelector('.nin')

const delAll = document.querySelector('.delAll')
const delLast = document.querySelector('.delLast')
const mod = document.querySelector('.mod')
const div = document.querySelector('.divi')
const mult = document.querySelector('.mult')
const sub = document.querySelector('.sub')
const sum = document.querySelector('.sum')
const neg = document.querySelector('.neg')
const point = document.querySelector('.point')
const equal = document.querySelector('.equal')

let str = '';
let isEqualClicked = false

const numbers = [zero, one, two, three, four, five, six, seven, eight, nine]
const signs = [mod, div, mult, sub, sum, neg, point]

function numLogic(){
    if(isEqualClicked){
        input.innerHTML = this.innerHTML
        copyInput.innerHTML = this.innerHTML
        str = this.innerHTML
        isEqualClicked = false
    } else {
        cutSymbol(input, 17)
        cutSymbol(copyInput, 26)

        checkEmpty(input)
        checkEmpty(copyInput)
        
        input.innerHTML += this.innerHTML
        copyInput.innerHTML += this.innerHTML
        str += this.innerHTML
    }   
}

function signLogic(){
    if(isEqualClicked){
        input.innerHTML = str + this.innerHTML
        copyInput.innerHTML = str + this.innerHTML
        str += this.innerHTML
        isEqualClicked = false
    } else {
        if(input.innerHTML[input.innerHTML.length - 1] >= '0' && input.innerHTML[input.innerHTML.length - 1] <= '9') {
            cutSymbol(input, 17)
            cutSymbol(copyInput, 26)

            checkEmptySign(input, this)
            checkEmptySign(copyInput, this)

            input.innerHTML += this.innerHTML
            copyInput.innerHTML += this.innerHTML
            str += this.innerHTML
        }
    }
}

function equalLogic(){
    isEqualClicked = true
    let result = eval(str)
    input.innerHTML = result
    str = result
}

window.addEventListener('keydown', logicKeyDown);

function logicKeyDown(event) {
    const key = event.key;
    if (/[0-9]/.test(key)) {
        const numberElement = numbers.find(item => item.innerHTML === key);
        if (numberElement) {
            numLogic.call(numberElement);
        }
    } else if (/[+\-*/.%]/.test(key)) {
        const signElement = signs.find(item => item.innerHTML === key);
        if (signElement) {
            signLogic.call(signElement);
        }
    } else if (key === 'Enter') {
        equalLogic();
    }
}

numbers.forEach( item => item.addEventListener('click', numLogic))
signs.forEach( item => item.addEventListener('click', signLogic))
equal.addEventListener('click', equalLogic)


delAll.addEventListener('click', ()=>{
    input.innerHTML = '0'
    copyInput.innerHTML = '0'
    str = ''
})

delLast.addEventListener('click', ()=>{
    checkEmptyDel(input)
    checkEmptyDel(copyInput)
    input.innerHTML = input.innerHTML.slice(0, -1)
    copyInput.innerHTML = copyInput.innerHTML.slice(0, -1)
    str = str.slice(0, -1)
    checkEmptyDel(input)
    checkEmptyDel(copyInput)
})


function cutSymbol(itm, count){
    if(itm.innerHTML.length >= count){
        itm.innerHTML = itm.innerHTML.slice(1)
    }
}
function checkEmptyDel(itm){
    if(itm.innerHTML.length < 1){
        itm.innerHTML = '0'
    }
}
function checkEmpty(itm){
    if(itm.innerHTML === '0'){
        itm.innerHTML = ''
    }
}

function checkEmptySign(itm, sign){
    if(itm.innerHTML === '0' && sign.innerHTML !== '.'){
        itm.innerHTML =''
    }
}


function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkModeEnabled = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkmode', isDarkModeEnabled);
}

toggler.addEventListener('click', toggleDarkMode);

window.addEventListener('load', () => {
    const isDarkModeEnabled = localStorage.getItem('darkmode');
    if (isDarkModeEnabled === 'true') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    setInterval(() => {
        allLoadings.forEach(item => {
            item.classList.remove('loading');
        });
    }, 2000);
});

