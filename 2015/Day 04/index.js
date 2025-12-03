const fs = require("fs");
const crypto = require('crypto');
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");


console.log("AoC 2015 Day 4:");

// Part 1
let hash = '';
let i = 0;
while (!hash.startsWith('00000')) {
    hash = crypto.createHash('md5').update(`${input}${i}`).digest("hex");
    i++;
}

console.log(`Part 1 answer: ${i - 1}`); // 117946


// Part 2
hash = '';
i = 0;
while (!hash.startsWith('000000')) {
    hash = crypto.createHash('md5').update(`${input}${i}`).digest("hex");
    i++;
}
console.log(`Part 2 answer: ${i - 1}`); // 3938038