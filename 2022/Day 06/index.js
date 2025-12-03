const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");


console.log("AoC 2022 Day 6:");

// Part 1
let markerIndex = 0;
for (let i = 0; i < input.length - 3; i++) {
    if (new Set(input.slice(i, i + 4)).size === 4) {
        markerIndex = i + 4;
        break;
    }
}

console.log(`Part 1 answer: ${markerIndex}`); // 1109


// Part 2
let startOfMessageIndex = 0;
for (let i = 0; i < input.length - 13; i++) {
    if (new Set(input.slice(i, i + 14)).size === 14) {
        startOfMessageIndex = i + 14;
        break;
    }
}

console.log(`Part 2 answer: ${startOfMessageIndex}`); // 3965