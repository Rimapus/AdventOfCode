const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => elem.split(""));


console.log("AoC 2020 Day 3:");

let slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
let results = [];
slopes.forEach(slope => {
    let x = 0, y = 0;
    let treesCount = 0;
    while (y < input.length) {
        if (input[y][x % input[0].length] === "#") treesCount++;
        x += slope[0];
        y += slope[1];
    }
    results.push(treesCount);
});

// Part 1
console.log(`Part 1 answer: ${results[1]}`); // 218


// Part 2
console.log(`Part 2 answer: ${results.reduce((a, b) => a * b)}`); // 3847183340