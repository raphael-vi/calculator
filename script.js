const operators = Array.from(document.querySelectorAll('[data-operators]'));
const numbers = Array.from(document.querySelectorAll('[data-number]'));

const equal = document.querySelector('#equal');
const eraser = document.querySelector('[data-delete]');
const clear = document.querySelector('[data-clear]');

const previousOpTxt = document.querySelector('.prevOp');
const currentOpTxt = document.querySelector('.currentOp');

class Calculator{
    constructor(previousOpTxt, currentOpTxt){
        this.previousOpTxt = previousOpTxt;
        this.currentOpTxt =currentOpTxt;
        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
       
    }
    
    erase(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    
    }

    appendNumber(number){
        if(number == '.' && this.currentOperand.includes('.')){
            return;
        }
        
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }

    chooseOperation(operator){
        if(this.currentOperand === ''){
            return;
        }
        
        if(this.previousOperand !== ''){
            this.compute()
        }

        this.operation = operator
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''
    


    }

    compute(){
        let result;
        let previous = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);
        
        if(isNaN(previous) || isNaN(current)){
            return;
        }
        switch(this.operation){
            case '+':
                result = previous + current;
                break
                
            case '-':
                result = previous - current;
                break
                
            case '/':         
                result = previous / current;
                break
                
            case '*':
                result = previous * current;
                break
            default: return;
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    

    }

    getDisplayNum(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.' [0]))
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''

        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })

        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`

        }else{
            return integerDisplay;
        }
    }

    updateDisplay(){
        this.currentOpTxt.innerText = this.getDisplayNum(this.currentOperand);
        this.previousOpTxt.innerText = this.getDisplayNum(this.previousOperand);
        
        if(this.operation != null ){
            this.previousOpTxt.innerText= `${this.getDisplayNum(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOpTxt.innerText = '';
        }
    }
}

const calculator = new Calculator(previousOpTxt, currentOpTxt);



numbers.forEach(number => number.addEventListener('click', () => {
    calculator.appendNumber(number.innerText)
    calculator.updateDisplay()
}))

operators.forEach(operator => operator.addEventListener('click', () => {
    calculator.chooseOperation(operator.innerText)
    calculator.updateDisplay()

}))

equal.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

eraser.addEventListener('click', () => {
    calculator.erase()
    calculator.updateDisplay()
})

clear.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

