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

    $('.button')
        .mouseup(function() {
            $(this).removeClass('highlight');
        })
        .mousedown(function() {
            $(this).addClass('highlight');
        });

    $('.digit').on('click', function () {
        digit = $(this).data('value');
        mainOperand = addDigit(mainOperand, digit);
        display();
    });

    $('.modifier').on('click', function () {
        switch ($(this).data('value')) {
            case 'fraction':
                if (!fraction) {
                    fraction = true;
                    mainOperand += ".";
                }
                break;
            case 'clear':
                mainOperand = 0;
                secondaryOperand = 0;
                fraction = false;
                break;
            case 'plusminus':
                mainOperand = -mainOperand;
                break;
            case 'percent':
                mainOperand /= 100;
                if (0 < mainOperand % 1) {
                    fraction = true;
                }
                break;
        }
        display();
    });
});
