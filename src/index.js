function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace("+", " + ")
            .replace("-", " - ")
            .replace("*", " * ")
            .replace("/", " / ")
            .replace("(", " ( ")
            .replace(")", " ) ");

    if (expr.includes("/ 0") || expr.includes("/  0") || expr.includes("/   0")) {
        throw new Error("TypeError: Division by zero.");
    } else if ((expr.match(/\(/g) != null && expr.match(/\)/g) == null)
            || (expr.match(/\(/g) == null && expr.match(/\)/g) != null)
            || (expr.match(/\(/g) != null && expr.match(/\)/g) != null && expr.match(/\(/g).length != expr.match(/\)/g).length)) {
        throw new Error("ExpressionError: Brackets must be paired");
    }

    let arr = expr.split(/\s+/g).filter(elem => elem != '');
    console.log(arr);
    const operators = {
        '/': function (a, b) {return a / b},
        '*': function (a, b) {return a * b},
        '-': function (a, b) {return a - b},
        '+': function (a, b) {return a + b},

    }
    const operatorSym = Object.keys(operators);

    function calculate(arr) {
        for (let i = 0; i < operatorSym.length; i++) {
            while (arr.includes(operatorSym[i])) {
                let pos = 0;
                while (pos < arr.length) {
                    if (arr[pos] == operatorSym[i]) {
                        let res = operators[operatorSym[i]](Number(arr[pos-1]), Number(arr[pos+1]));
                        arr.splice(pos-1, 3, res);
                        pos--;
                    } else {
                        pos++;
                    }
                }
            }
        }
        return arr[0];
    }

    while (arr.includes('(')) {
        let openingBracketIndex = arr.lastIndexOf('(');
        let closingBracketIndex = arr.slice(openingBracketIndex + 1).indexOf(')') + openingBracketIndex + 1;
        let partialArr = arr.slice(openingBracketIndex + 1, closingBracketIndex);
        arr.splice(openingBracketIndex, closingBracketIndex - openingBracketIndex + 1, calculate(partialArr));
    }


    return calculate(arr);
}

module.exports = {
    expressionCalculator
}
