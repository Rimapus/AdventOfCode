const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/);


console.log("AoC 2015 Day 5:");

// Part 1
let niceCount = 0;
input.forEach(elem => {
    if (elem.match(/[aeiou]/gi)?.length >= 3 &&
        /([a-z])\1+/.test(elem) &&
        !['ab', 'cd', 'pq', 'xy'].some(elem1 => elem.includes(elem1)))
        niceCount++;
});

console.log(`Part 1 answer: ${niceCount}`); // 255


// Part 2
niceCount = 0;
input.forEach(elem => {
    if (elem.match(/([a-z][a-z])[a-z]*\1/)?.length > 0 &&
        elem.match(/([a-z])[a-z]\1/)?.length > 0) {
        niceCount++;
    }
});

console.log(`Part 2 answer: ${niceCount}`); // 55