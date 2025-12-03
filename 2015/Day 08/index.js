const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/);


console.log("AoC 2015 Day 8:");

// Part 1
let literalLength = 0;
let memoryLength = 0;
for (let i = 0; i < input.length; i++) {
    let elem = input[i];
    literalLength += elem.length;
    memoryLength += eval(elem).length;
}

console.log(`Part 1 answer: ${literalLength - memoryLength}`); // 1333


// Part 2
let encodedLength = 0;
for (let i = 0; i < input.length; i++) {
    encodedLength += input[i].replaceAll('\\', '\\\\').replaceAll('"', '\\"').length + 2; // + 2 because of start and end "
}

console.log(`Part 2 answer: ${encodedLength - literalLength}`); // 2046