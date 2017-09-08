$(document).ready(function () {
    var fraction = false;
    var operationInProgress = false;
    var mainOperand = 0;
    var secondaryOperand = 0;
    var savedOperand = 0;
    var calculateSaved = false;
    var currentOperator = 'none';
    var savedOperator = 'none';

    display();

    function display() {
        $('.display').text(mainOperand);
    };

    function addDigit(number, digit) {
        if (fraction) {
            fractionalPart = number - Math.floor(number);
            number += "" + digit;
            number = parseFloat(number);
        } else {
            number *= 10;
            number += digit;
        }

        return number;
    };

    function moveMainOperand() {
        secondaryOperand = mainOperand;
        mainOperand = 0;
    }

    function checkForPriority(previousOperator, currentOperator) {
        if ((previousOperator === 'plus' || previousOperator === 'minus') &&
            (currentOperator === 'multiply' || currentOperator === 'divide')
        ) {
            return true;
        }

        return false;
    }

    function result() {
        mainOperand = doOperation(
            currentOperator,
            secondaryOperand,
            mainOperand
        );

        if (savedOperator !== 'none' && calculateSaved) {
            mainOperand = doOperation(
                                savedOperator,
                                savedOperand,
                                mainOperand
                            );
            savedOperator = 'none';
            savedOperand = 0;
        }
        testForFractionalPart();

        display();
    }

    function doOperation(operator, operand1, operand2) {
        var result = 0;

        switch (operator) {
            case 'plus':
                result = operand1 + operand2;
                break;
            case 'minus':
                result = operand1 - operand2;
                break;
            case 'multiply':
                result = operand1 * operand2;
                break;
            case 'divide':
                result = operand1 / operand2;
                break;
        }

        return result;
    }

    function caseFraction() {
        if (!fraction) {
            fraction = true;
            mainOperand += ".";
        }
    }

    function caseClear() {
        mainOperand = 0;
        secondaryOperand = 0;
        savedOperand = 0;
        currentOperator = 'none';
        savedOperator = 'none';
        operationInProgress = false;
        fraction = false;
        calculateSaved = false;
    }

    function testForFractionalPart() {
        if (0 < mainOperand % 1 || 0 > mainOperand % 1) {
            fraction = true;
        }
    }
    function doModifier(modifier) {
        switch (modifier) {
            case 'fraction':
                caseFraction();
                break;
            case 'clear':
                caseClear();
                break;
            case 'plusminus':
                mainOperand = -mainOperand;
                break;
            case 'percent':
                mainOperand /= 100;
                testForFractionalPart();
                break;
        }
    }

    $('.button')
        .mouseleave(function() {
            $(this).removeClass('highlight');
        })
        .mouseup(function() {
            $(this).removeClass('highlight');
        })
        .mousedown(function() {
            $(this).addClass('highlight');
        });

    $('.digit').on('click', function () {
        mainOperand = addDigit(mainOperand, $(this).data('value'));
        display();
    });

    $('.modifier').on('click', function () {
        doModifier($(this).data('value'));
        display();
    });

    $('.operator').on('click', function () {
        var operator = $(this).data('value');
        if (!operationInProgress) {
            currentOperator = operator;
            moveMainOperand();
            operationInProgress = true;
        } else {
            if (checkForPriority(currentOperator, operator)) {
                savedOperand = secondaryOperand;
                savedOperator = currentOperator;
                currentOperator = operator;
                moveMainOperand();
            } else {
                calculateSaved = 'plus' === operator || 'minus' === operator;
                result();
                moveMainOperand();
                currentOperator = operator;
            }
        }
    });

    $('.result').on('click', function () {
        operationInProgress = false;
        calculateSaved = true;

        if ('equal' !== currentOperator) {
            result();
        }

        currentOperator = 'equal';
    });
});
