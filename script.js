const previousOperationsText = document.querySelector("#previous-operations");
const currentOperationsText = document.querySelector("#current-operations");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationsText, currentOperationsText) {
        this.previousOperationsText = previousOperationsText;
        this.currentOperationsText = currentOperationsText;
        this.currentOperation = "";

    }
    //add digit to calculator screen
    addDigit(digit){
        //check if current operation already has a dot
        if(digit === "." && this.currentOperationsText.innerText.includes(".")){
            return;
        }
        
        this.currentOperations = digit;
        this.updateScreen();
    }
    //process all calculator operations
    processOperations(operations){
        //check if currenty is empty
        if(this.currentOperationsText.innerText === "" && operations !== "C"){
            //change operation
            if(this.previousOperationsText.innerText !== ""){
                this.changeOperation(operations);
            }
            return
        }
        
        //get current and previous value
        let operationsValue;
        const previous = +this.previousOperationsText.innerText.split(" ")[0];
        const current = +this.currentOperationsText.innerText;

        switch(operations) {
            case "+":
                operationsValue = previous + current
                this.updateScreen(operationsValue, operations, current, previous);
                break;
            case "-":
                operationsValue = previous - current
                this.updateScreen(operationsValue, operations, current, previous);
                break;
            case "/":
                operationsValue = previous / current
                this.updateScreen(operationsValue, operations, current, previous);
                break;        
            case "*":
                operationsValue = previous * current
                this.updateScreen(operationsValue, operations, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperations();
                break;
            case "C":
                this.processClearAllOperations();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;
        }
    }

    //change values of the calculator screen
    updateScreen(operationsValue = null, 
        operations = null, 
        current = null, 
        previous = null
        ) {
            console.log(operationsValue, operations, current, previous);
            if(operationsValue === null){
                this.currentOperationsText.innerText += this.currentOperations;
            } else{
                //check if value is zero, if it is just add current value
                if(previous === 0){
                    operationsValue = current
                }
                //add current value to previous
                this.previousOperationsText.innerText = `${operationsValue} ${operations}`
                this.currentOperationsText.innerText = "";
            }
       
    }
    //change math operation
    changeOperation(operation){
        const mathOperation = ["*", "/", "+", "-"]
        if (!mathOperation.includes(operation)){
            return
        }
        this.previousOperationsText.innerText = 
            this.previousOperationsText.innerText.slice(0, -1) + operation;
    }
    //delete the last digit
    processDelOperator(){
        this.currentOperationsText.innerText = 
            this.currentOperationsText.innerText.slice(0, -1);
    }
    //clear current operation
    processClearCurrentOperations(){
        this.currentOperationsText.innerText = "";
    }
    //clear all operation
    processClearAllOperations(){
        this.currentOperationsText.innerText = "";
        this.previousOperationsText.innerText = "";
    }
    //process an operation
    processEqualOperator(){
        const operations = previousOperationsText.innerHTML.split(" ")[1];
        this.processOperations(operations);
    }
}

const calc = new Calculator (previousOperationsText, currentOperationsText);

buttons.forEach((btn) => { 
    btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if(+value >= 0 || value === ".") {
        calc.addDigit(value);
    } else {
        calc.processOperations(value);
    }
    });

});

