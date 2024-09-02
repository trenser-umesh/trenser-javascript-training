function clearScreen() {
  document.getElementById("calculator-display").value = "";
}

function addToDisplay(buttonValue) {
  document.getElementById("calculator-display").value += buttonValue;
}

function deleteLastElement() {
  let currentValue = document.getElementById("calculator-display").value;
  document.getElementById("calculator-display").value = currentValue.slice(0,-1);
}

function calculateResult() {
  let currentValue = document.getElementById("calculator-display").value;
  currentValue = processPercentage(currentValue);
  let numbers = currentValue.split(/[\+\-\x\/]/).map(Number);
  let operators = currentValue.split(/[\d.]+/).filter(Boolean);
  result = processOperations(numbers, operators);
  document.getElementById("calculator-display").value = result;
}

function processOperations(numbers, operators) {
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === "x" || operators[i] === "/") {
      let result = calculateOperation(numbers[i], numbers[i + 1], operators[i]);
      numbers.splice(i, 2, result);
      operators.splice(i, 1);
      i--;
    }
  }
  for (let i = 0; i < operators.length; i++) {
    let result = calculateOperation(numbers[i], numbers[i + 1], operators[i]);
    numbers.splice(i, 2, result);
    operators.splice(i, 1);
    i--;
  }
  return numbers[0];
}

function calculateOperation(firstValue, secondValue, operator) {
  switch (operator) {
    case "+":
      return firstValue + secondValue;
      break;
    case "-":
      return firstValue - secondValue;
      break;
    case "x":
      return firstValue * secondValue;
      break;
    case "/":
      return firstValue / secondValue;
      break;
    default:
      break;
  }
}

function processPercentage(expression) {
  let percentageRegex = /\d+%/g;
  let isMatch = expression.match(percentageRegex);
  if (isMatch) {
    isMatch.forEach((match) => {
      let number = parseFloat(match);
      let percentageValue = calculatePercentage(number);
      expression = expression.replace(match, percentageValue);
    });
  }
  return expression;
}

function calculatePercentage(firstValue) {
  const result = firstValue / 100;
  return result;
}