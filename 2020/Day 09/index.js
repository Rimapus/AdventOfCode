const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/).map(Number);


console.log("AoC 2020 Day 9:");

// Part 1
let preambleLength = 25;
let answer = 0;
for (let i = preambleLength; i < input.length; i++) {
    let valid = false;
    let preamble = input.slice(i - preambleLength, i);
    preamble.forEach(elem => {
        valid = (preamble.indexOf(input[i] - elem) !== -1) ? true : valid;
    });

    if (!valid) {
        answer = input[i];
        break;
    }
}

console.log(`Part 1 answer: ${answer}`); // 373803594


// Part 2
let contiguousSet = [];
let startIndex = 0;
while (contiguousSet.reduce((a, b) => a + b, 0) !== answer) {
    contiguousSet = [];

    for (let i = startIndex; i < input.length; i++) {
        if (contiguousSet.reduce((a, b) => a + b, 0) + input[i] > answer) {
            startIndex++;
            break;

        } else contiguousSet.push(input[i]);
    }
}

console.log(`Part 2 answer: ${Math.min(...contiguousSet) + Math.max(...contiguousSet)}`); // 51152360