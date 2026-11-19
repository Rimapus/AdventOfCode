const fs = require("fs");
let input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

input = input.split(/\r?\n\r?\n/);
const areas = input.at(-1).split(/\r?\n/).map(area => {
    const split = area.split(": ");
    return [split[0].split("x").map(Number), split[1].split(" ").map(Number)];
});


console.log("AoC 2025 Day 12:");

// Part 1
let validAreas = 0;
for (const area of areas) {
    validAreas += area[0].reduce((a, b) => a * b) >= area[1].reduce((a, b) => a + b) * 9;
}
console.log(`Part 1 answer: ${validAreas}`); // 579


// Part 2
console.log(`Part 2 answer: ${""}`); // The real second star are the friends we made along the way!
