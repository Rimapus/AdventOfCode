const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n/);


console.log("AoC 2024 Day 3:");

let sum1 = 0;
let mul_enabled = true;
let sum2 = 0;
input.forEach(line => {
    const matches = Array.from(line.matchAll(/mul\(([0-9]+),([0-9]+)\)|do\(\)|don't\(\)/g));
    sum1 += matches.reduce((prev, curr) => {
        if (curr[0].startsWith("mul("))
            prev += +curr[1] * +curr[2];
        return prev;
    }, 0);
    sum2 += matches.reduce((prev, curr) => {
        if (curr[0] == "do()")
            mul_enabled = true;
        if (curr[0] == "don't()")
            mul_enabled = false;
        if (mul_enabled && curr[0].startsWith("mul("))
            prev += +curr[1] * +curr[2];
        return prev;
    }, 0);
});

// Part 1
console.log(`Part 1 answer: ${sum1}`); // 161289189


// Part 2
console.log(`Part 2 answer: ${sum2}`); // 83595109