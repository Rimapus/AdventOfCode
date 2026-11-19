const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => elem.trim().split(/\s+/).map(Number));


console.log("AoC 2016 Day 3:");

// Part 1
console.log(`Part 1 answer: ${input.filter(([a, b, c]) => (a + b > c) && (a + c > b) && (b + c > a)).length}`); // 982


// Part 2
const verticalTriangles = [];
for (let col = 0; col < 3; col++) {
    for (let row = 0; row < input.length; row += 3) {
        verticalTriangles.push(input.slice(row, row + 3).map(e => e[col]));
    }
}

console.log(`Part 2 answer: ${verticalTriangles.filter(([a, b, c]) => (a + b > c) && (a + c > b) && (b + c > a)).length}`); // 1826
