const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => elem.split(",").map(elem1 => elem1.split("-").map(Number)));

let fullOverlap = 0;
let partialOverlap = 0;
input.forEach(elem => {
    if (elem[0][0] <= elem[1][0] && elem[0][1] >= elem[1][1]) fullOverlap++;
    else if (elem[0][0] >= elem[1][0] && elem[0][1] <= elem[1][1]) fullOverlap++;

    if (elem[0][1] >= elem[1][0] && elem[1][1] >= elem[0][0]) partialOverlap++;
});


console.log("AoC 2022 Day 4:");

// Part 1
console.log(`Part 1 answer: ${fullOverlap}`); // 475


// Part 2
console.log(`Part 2 answer: ${partialOverlap}`); // 825