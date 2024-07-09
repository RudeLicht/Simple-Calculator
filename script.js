document.addEventListener('DOMContentLoaded', () => {
    let currentInput = '';
    let previousInput = '';
    let operator = null;

    function updateDisplay() {
        onScreenResult.innerHTML = currentInput || '0';
        if (previousInput && operator) {
            onScreenResult.innerHTML = `${previousInput} ${operator} ${currentInput}`;
        } else {
            onScreenResult.innerHTML = currentInput || previousInput || '0';
        }
    }

    function handleNumber(number) {
        currentInput += number;
        updateDisplay();
    }

    function handleOperator(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
        updateDisplay();
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        operator = null;
        previousInput = '';
        updateDisplay();
    }

    function clear() {
        currentInput = '';
        previousInput = '';
        operator = null;
        updateDisplay();
    }

    function deleteLast() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }

    document.addEventListener("click", x => {
        switch (x.target.innerHTML) {
            case "C":
                clear();
                break;
            case "DEL":
                deleteLast();
                break;
            case "/":
            case "*":
            case "-":
            case "+":
                handleOperator(x.target.innerHTML);
                break;
            case "=":
                calculate();
                break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                handleNumber(x.target.innerHTML);
                break;
            default:
                break;
        }
    });
});
