const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n\r?\n/)
    .map(elem => elem.split(/\r?\n/)
        .reduce((a, b) => a + +b, 0)
    )
    .sort((a, b) => b - a);


console.log("AoC 2022 Day 1:");

// Part 1
console.log(`Part 1 answer: ${input[0]}`); // 72070


// Part 2
console.log(`Part 2 answer: ${input.slice(0, 3).reduce((a, b) => a + b, 0)}`); // 211805
