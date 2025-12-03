const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/).map(elem => elem.split("   "));
let col1 = input.map(elem => elem[0]).sort((a, b) => a - b);
let col2 = input.map(elem => elem[1]).sort((a, b) => a - b);

console.log("AoC 2024 Day 1:");

// Part 1
let diffSum = 0;
for (let i = 0; i < col1.length; i++) {
    diffSum += Math.abs(col1[i] - col2[i]);
}
console.log(`Part 1 answer: ${diffSum}`); // 1834060


// Part 2
let similarityScore = 0;
for (let i = 0; i < col1.length; i++) {
    let countInCol2 = 0;
    for (let j = 0; j < col2.length; j++) {
        if (col2[j] === col1[i]) countInCol2++;
    }
    similarityScore += col1[i] * countInCol2;
}
console.log(`Part 2 answer: ${similarityScore}`); // 21607792