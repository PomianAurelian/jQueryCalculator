$(document).ready(function () {
    var fraction = false;
    var mainOperand = 0;
    var secondaryOperand = 0;
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

    $('.digit').on('click', function () {
        digit = $(this).data('value');
        mainOperand = addDigit(mainOperand, digit);
        display();
    });

    $('.fraction').on('click', function () {
        fraction = true;
        mainOperand += ".";
        display();
    });

});
