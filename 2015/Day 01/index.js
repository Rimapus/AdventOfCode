const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split('');


console.log("AoC 2015 Day 1:");

// Part 1
let ups = input.filter(elem => elem === '(').length;
let downs = input.filter(elem => elem === ')').length;

console.log(`Part 1 answer: ${ups - downs}`); // 74


// Part 2
let floor = 0;
let answer = 0;
for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') floor++;
    else if (input[i] === ')') floor--;

    if (floor === -1) { answer = i + 1; break; }
}
console.log(`Part 2 answer: ${answer}`); // 1795