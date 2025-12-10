const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/)
    .map(elem => elem.split(/[ \t]+/g).map(Number));


console.log("AoC 2017 Day 2:");

let checksum1 = 0;
let checksum2 = 0;
input.forEach(row => {
    checksum1 += Math.max(...row) - Math.min(...row);

    for (const i in row) {
        for (const j in row) {
            if (i !== j && (row[i] % row[j] === 0)) {
                checksum2 += row[i] / row[j];
            }
        }
    }
});

// Part 1
console.log(`Part 1 answer: ${checksum1}`); // 37923


// Part 2
console.log(`Part 2 answer: ${checksum2}`); // 263
