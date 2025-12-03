const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split("")
    .map(Number);


console.log("AoC 2017 Day 1:");

let sum1 = 0;
let sum2 = 0;
input.forEach((elem, i, arr) => {
    if (elem === arr[(i + 1) % arr.length]) {
        sum1 += elem;
    }

    if (elem === arr[(i + (arr.length / 2)) % arr.length]) {
        sum2 += elem;
    }
});

// Part 1
console.log(`Part 1 answer: ${sum1}`); // 1390


// Part 2
console.log(`Part 2 answer: ${sum2}`); // 1232