const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/).map(elem => [elem[0], Number(elem.slice(1))]);


console.log("AoC 2025 Day 1:");

let dial = 50;
let zeroes_p1 = 0;
let zeroes_p2 = 0;
for (const rotation of input) {
    switch (rotation[0]) {
        case "L":
            for (let i = 0; i < rotation[1]; i++) {
                dial--;
                if (dial === 0) zeroes_p2++;
                if (dial === -1) dial = 99;
            }
            break;
        case "R":
            for (let i = 0; i < rotation[1]; i++) {
                dial++;
                if (dial === 100) {
                    dial = 0;
                    zeroes_p2++;
                }
            }
            break;
    }
    if (dial === 0) zeroes_p1++;
}

// Part 1
console.log(`Part 1 answer: ${zeroes_p1}`); // 992


// Part 2
console.log(`Part 2 answer: ${zeroes_p2}`); // 6133
