const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(",")
    .map(Number);
let fishs = Array(9).fill(0).map((e, i) => { return input.filter(elem => elem === i).length; });


console.log("AoC 2021 Day 6:");

let answer1;
for (let i = 0; i < 256; i++) {
    if (i === 80) answer1 = Object.values(fishs).reduce((a, b) => a + b);

    let newFishs = fishs.shift();
    fishs.push(newFishs);
    fishs[6] += newFishs;
}

// Part 1
console.log(`Part 1 answer: ${answer1}`); // 374994


// Part 2
console.log(`Part 2 answer: ${Object.values(fishs).reduce((a, b) => a + b)}`); // 1686252324092