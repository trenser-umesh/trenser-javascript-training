function clearScreen() {
    document.getElementById("calculator-display").value = "";
}

function addToDisplay(buttonValue) {
    document.getElementById("calculator-display").value += buttonValue;
}

function deleteLastElement() {
    let currentValue=document.getElementById("calculator-display").value;
    document.getElementById("calculator-display").value = currentValue.slice(0,-1);
}

function calculateResult() {
    let currentValue=document.getElementById("calculator-display").value;
    let lengthOfInput=currentValue.length;
    let firstValue,secondValue,operator,result;
    let percentageFlag=false;
    for(let i=0;i<lengthOfInput;i++) {
        if(currentValue[i]==='+'||currentValue[i]==='-'||currentValue[i]==='x'||currentValue[i]==='/'||currentValue[i]==='%') {
            firstValue=currentValue.slice(0,i);
            operator=currentValue[i];
            console.log(operator);
            if(currentValue[i]==='%') {
                firstValue=parseFloat(firstValue);
                result=calculatePercentage(firstValue);
                percentageFlag=true;
                break;
            }
            secondValue=currentValue.slice(i+1,lengthOfInput);
            break;
        }
    }
    if(percentageFlag) {
        document.getElementById("calculator-display").value =result;
    } else {
        firstValue=parseFloat(firstValue);
        secondValue=parseFloat(secondValue);
        result=calculateOperation(firstValue,secondValue,operator);
        document.getElementById("calculator-display").value =result;
    }
}

function calculateOperation(firstValue,secondValue,operator) {
    switch (operator) {
        case '+':
            return firstValue+secondValue;
            break;
        case '-':
            return firstValue-secondValue;
            break;
        case 'x':
            return firstValue*secondValue;
            break;
        case '/':
            return firstValue/secondValue;
            break;
        default:
            break;
    }
}

function calculatePercentage(firstValue) {
    console.log(firstValue);
    const result=firstValue/100;
    return result;
}