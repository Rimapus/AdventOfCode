const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/);
const operators = input[input.length - 1].trim().split(/ +/);


console.log("AoC 2025 Day 6:");

// Part 1
const operands1 = input.slice(0, -1).map(line => line.trim().split(/ +/).map(Number));
let grandTotal1 = 0;
for (let i = 0; i < operands1[0].length; i++) {
    const operator = operators[i];
    const operands = operands1.map(op => op[i]);

    grandTotal1 += operands.reduce((a, b) => {
        if (operator === "*") return a * b;
        else return a + b;
    }, operator === "*" ? 1 : 0);
}
console.log(`Part 1 answer: ${grandTotal1}`); // 6371789547734


// Part 2
const operands2 = input.slice(0, -1);
let grandTotal2 = 0;
let problemIndex = 0;
for (let i = 0; i < operands2[0].length; i++) {
    const operator = operators[problemIndex];
    let total = operator === "*" ? 1 : 0;
    let operand = Number(operands2.map(op => op[i]).join(""));

    while (operand !== 0) {
        if (operator === "*") total *= operand;
        else total += operand;
        i++;
        operand = Number(operands2.map(op => op[i]).join(""));
    }
    grandTotal2 += total;
    problemIndex++;
}
console.log(`Part 2 answer: ${grandTotal2}`); // 11419862653216