const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => elem.split(""));


console.log("AoC 2016 Day 2:");

const coefficients = [[0, -1], [0, 1], [-1, 0], [1, 0]]; // U, D, L, R
const keypad = [[1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]];
let currentDigitCoords = [1, 1];
let code = [];

const keypad2 = [[null, null, 1, null, null],
    [null, 2, 3, 4, null],
    [5, 6, 7, 8, 9],
    [null, "A", "B", "C", null],
    [null, null, "D", null, null]];
let currentDigitCoords2 = [0, 2];
let code2 = [];

input.forEach((e, i) => {
    let newDigitCoords = currentDigitCoords;
    let newDigitCoords2 = currentDigitCoords2;
    e.forEach(m => {
        const coefIndex = ["U", "D", "L", "R"].indexOf(m);

        newDigitCoords = newDigitCoords.map((e, i) => e += coefficients[coefIndex][i]);
        newDigitCoords2 = newDigitCoords2.map((e, i) => e += coefficients[coefIndex][i]);

        keypad[newDigitCoords[1]]?.[newDigitCoords[0]] ? (currentDigitCoords = newDigitCoords) : (newDigitCoords = currentDigitCoords);
        code[i] = keypad[newDigitCoords[1]][newDigitCoords[0]];
        keypad2[newDigitCoords2[1]]?.[newDigitCoords2[0]] ? (currentDigitCoords2 = newDigitCoords2) : (newDigitCoords2 = currentDigitCoords2);
        code2[i] = keypad2[newDigitCoords2[1]][newDigitCoords2[0]];
    });
});

// Part 1
console.log(`Part 1 answer: ${code.join("")}`); // 19636


// Part 2
console.log(`Part 2 answer: ${code2.join("")}`); // 3CC43